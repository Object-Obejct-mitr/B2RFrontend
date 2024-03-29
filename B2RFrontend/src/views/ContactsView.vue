<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3">
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
          <div class="position-sticky">
            <div class="list-group list-group-flush mx-3 mt-4">
              <a href="#" class="list-group-item list-group-item-action py-2 ripple" @click.prevent="selectList('all')">
                <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>All Contact List</span>
              </a>
              <a href="#" v-for="(category) in categories" :key="category" class="list-group-item list-group-item-action py-2 ripple" @click.prevent="selectList(category)">
                <i class="fas fa-chart-area fa-fw me-3"></i><span>{{ category }}</span>
              </a>
            </div>
          </div>
        </nav>
        <div class="contactModal">
          <AddContactList></AddContactList>
          <DeleteContactList></DeleteContactList>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="modals">
          <AddContactModal></AddContactModal>
          <input type="text" class="form-control" placeholder="Search by name" @click="search" v-model="searchQuery" style="width: 200px;">
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in filteredUsers" :key="user.userID">
              <!-- Index is corresponding to the user -->
              <td>{{ user.firstName }}</td>
              <td>{{ user.surName }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span v-for="tag in user.tags" :key="tag" class="badge bg-primary">{{ tag }}</span>
              </td>
              <td>
                <UserInfoModal :user="user" :id="user.userID+''+index"></UserInfoModal>
                <EditInfoModal :user="user" :id="user.userID+''+index"></EditInfoModal>
                <a class="btn btn-sm btn-danger" @click.prevent="deleteUser(user)"><i class="fas fa-trash-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  .col-lg-3 {
    border-right: 1px solid #ccc;
    width: 20%;
  }
  .modals {
    margin-top: 1rem;
  }
.contactModal {
    margin-top: 1rem;
    text-align: center;
}
  </style>
  
  <script>
  import AddContactModal from '@/components/Contactsview/contactModal.vue';
  import AddContactList from '@/components/Contactsview/contactList.vue';
  import DeleteContactList from '@/components/Contactsview/deletecontactList.vue';
  import UserInfoModal from '@/components/Contactsview/UserInfoModal.vue';
  import EditInfoModal from '@/components/Contactsview/EditModal.vue';
  import { db } from "../firebase";
  import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"; 
  import { ref, computed, watchEffect } from 'vue';

  export default {
    props: {
      id: String
    },
    components: {
      AddContactModal,
      AddContactList,
      DeleteContactList,
      UserInfoModal,
      EditInfoModal
    },
    setup() {
      const users = ref([]);
      const categories = ref([]);
      const selectedList = ref('all');
      const searchQuery = ref('');
  
      const contactPageCollectionRef = collection(db, "contactPage");

      const selectList = (list) => {
        selectedList.value = list;
      };

      const search = () => {
      // Filter the users based on the search query
      // You can add more fields to search in the user object
      users.value = users.value.filter(user => {
        const fullName = user.firstName.toLowerCase() + ' ' + user.surName.toLowerCase();
        return fullName.includes(searchQuery.value.toLowerCase());
      });
    };

      const filteredUsers = computed(() => {
        return users.value.filter(user => {
        const fullName = user.firstName.toLowerCase() + ' ' + user.surName.toLowerCase();
          return fullName.includes(searchQuery.value.toLowerCase());
        });
          // return users.value; 
          //.filter(user => user.category === selectedList.value); // replace List with the correct field name
      });
  
      const fetchCategories = async () => {
        categories.value = [];
        const querySnapshot = await getDocs(contactPageCollectionRef);
        querySnapshot.forEach(doc => {
          const category = doc.data().category;
          // console.log(doc.data().category);
          if (!categories.value.includes(category)) {
            categories.value.push(category);
          }
        });
      };
  
      const fetchUsers = async () => {
      users.value = [];
      let querySnapshot;
      console.log(selectedList.value);
        if (selectedList.value === 'all') {
          // fetch all users
          const contactPageSnapshot = await getDocs(collection(db, 'contactPage'));
          for (const pageDoc of contactPageSnapshot.docs) {
            const contactsListSnapshot = await getDocs(collection(pageDoc.ref, 'contactsList'));
            contactsListSnapshot.forEach(doc => {
              users.value.push(doc.data());
            });
          }
        } else {
          // fetch users for a specific category
          const q = query(contactPageCollectionRef, where("category", "==", selectedList.value));
          querySnapshot = await getDocs(q);
          let categoryId = querySnapshot.docs[0].id;
          const check = collection(db, "contactPage/" + categoryId + "/contactsList");
          querySnapshot = await getDocs(check);
          querySnapshot.forEach(doc => {
            users.value.push(doc.data());
          });
        }
      };

    const deleteUser = async (user) => {
      console.log(user.userID);
      //Get category ID
      const q = query(contactPageCollectionRef, where("category", "==", user.category));
      let querySnapshot = await getDocs(q);
      let categoryId = querySnapshot.docs[0].id;
      //Get Document ID
      const check = collection(db, "contactPage", categoryId, "contactsList");
      let user_query = query(check, where("userID", "==", user.userID));
      let userDoc = await getDocs(user_query);
      let user_dataID = userDoc.docs[0].id;
      //Delete the user
      const deleteUserData = doc(db,"contactPage", categoryId, "contactsList", user_dataID);
      await deleteDoc(deleteUserData);
      console.log(`User with ID ${user_dataID} deleted`);
      window.location.reload();
    };
    
    fetchCategories();
  
    watchEffect(() => {
      fetchUsers();
    });
 
      return {
        categories,
        selectedList,
        filteredUsers,
        searchQuery,
        selectList,
        deleteUser,
        search
      };
    },
  };
  </script>