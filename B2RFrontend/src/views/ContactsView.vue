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
      </div>
      <div class="col-lg-9">
        <div class="modals">
          <AddContactList></AddContactList>
          <AddContactModal></AddContactModal>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>CheckBox</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in filteredUsers" :key="user.UserID">
              <td>
                <input type="checkbox" name="contactlist" />
              </td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.surName }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span v-for="tag in user.tags" :key="tag" class="badge bg-primary">{{ tag }}</span>
              </td>
              <td>
                <a class="btn btn-sm btn-info" data-bs-toggle="collapse" :href="'#userDesc' + user.UserID" @click="toggleUserDesc(user)">
                  <i class="fas fa-align-justify"></i>
                </a>                    
                <a href="#" class="btn btn-sm btn-primary"><i class="fas fa-pencil-alt"></i></a>
                <a href="#" class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-for="(user) in filteredUsers" :key="user.UserID">
          <div :colspan="7">
            <div :id="'userDesc' + user.UserID" class="collapse">
              {{ user.description }}
            </div>
          </div>
        </div>
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

  </style>
  
  <script>
  import AddContactModal from '@/components/Contactsview/contactModal.vue';
  import AddContactList from '@/components/Contactsview/contactList.vue';
  import { db } from "../firebase";
  import { collection, doc, getDocs, query, where } from "firebase/firestore"; 
  import { ref, computed, watchEffect } from 'vue';
  
  export default {
    components: {
      AddContactModal,
      AddContactList
    },
    setup() {
      const users = ref([]);
      const categories = ref([]);
      const selectedList = ref('all');
  
      const contactPageCollectionRef = collection(db, "contactPage");

      const selectList = (list) => {
        selectedList.value = list;
      };
  
      const toggleUserDesc = (user) => {
        const userDesc = document.getElementById('userDesc' + user.UserID);
        const isCollapsed = userDesc.classList.contains('show');
        isCollapsed ? userDesc.classList.remove('show') : userDesc.classList.add('show');
      };
  
      const filteredUsers = computed(() => {
          return users.value; //.filter(user => user.category === selectedList.value); // replace List with the correct field name
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

    
    fetchCategories();
  
    watchEffect(() => {
      fetchUsers();
    });
 
      return {
        categories,
        selectedList,
        filteredUsers,
        selectList,
        toggleUserDesc
      };
    },
  };
  </script>