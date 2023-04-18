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
              <a v-for="category in this.categories" :key="category" href="#"
                class="list-group-item list-group-item-action py-2 ripple" @click.prevent="selectList(category)">
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
        <div class="d-flex flex-row mt-3 mb-3 justify-content-end">
          <AddContactModal />
          <input v-model="searchQuery" type="text" class="form-control ms-3" placeholder="Search by name"
            style="width: 200px" @click="search" />
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="h5">First Name</th>
              <th class="h5">Last Name</th>
              <th class="h5">Phone Number</th>
              <th class="h5">Email</th>
              <th class="h5">Tags</th>
              <th class="h5">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user.userID">
              <!-- Index is corresponding to the user -->
              <td>{{ user.firstName }}</td>
              <td>{{ user.surName }}</td>
              <td>{{ user.phoneNumber }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span v-for="tag in user.tags" :key="tag" class="badge bg-primary me-2">{{ tag }}</span>
              </td>
              <td>
                <UserInfoModal :id="user.userID + '' + index" :user="user"></UserInfoModal>
                <EditInfoModal :id="user.userID + '' + index" :user="user"></EditInfoModal>
                <a class="btn btn-sm btn-danger" @click.prevent="deleteUser(user)"><i class="fas fa-trash-alt"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>
import AddContactModal from "@/components/Contactsview/contactModal.vue";
import AddContactList from "@/components/Contactsview/contactList.vue";
import DeleteContactList from "@/components/Contactsview/deletecontactList.vue";
import UserInfoModal from "@/components/Contactsview/UserInfoModal.vue";
import EditInfoModal from "@/components/Contactsview/EditModal.vue";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { ref, computed, watchEffect } from "vue";

export default {
  components: {
    AddContactModal,
    AddContactList,
    DeleteContactList,
    UserInfoModal,
    EditInfoModal,
  },
  props: {
    id: String,
  },
  data() {
    return {
      users: [],
      categories: [],
      selectedList: "all",
      searchQuery: "",
      snapshots:[],
      contactPageCollectionRef: collection(db, "contactPage")

    }
  },
  methods: {
    async selectList(list) {
       if (list != this.selectedList) {
         this.selectedList = list;
         await this.fetchUsers();
       }
     },
    search() {
      // Filter the users based on the search query
      // You can add more fields to search in the user object
      this.users = this.users.filter((user) => {
        const fullName =
          user.firstName.toLowerCase() +
          " " +
          user.surName.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    },
    async fetchCategories() {
      this.categories = [];
      const querySnapshot = await getDocs(this.contactPageCollectionRef);
      querySnapshot.forEach((doc) => {
        const category = doc.data().category;
        // console.log(doc.data().category);
        if (!this.categories.includes(category)) {
          this.categories.push(category);
        }
      });
    },
    async fetchUsers() {
        this.users=[];
        let queryOperation= this.selectedList=="all" ? "!=" : "==";
        const q = query(collection(db,"contactPage"),where("category", queryOperation,this.selectedList));
        const data= await getDocs(q);
        data.forEach((doc)=>{
          getDocs(collection(db,"contactPage/"+doc.id+"/contactsList")).then((result)=> {
            result.forEach((doc)=> {
              this.users.push(doc.data());
            })
          })
        })
    },
    async deleteUser(user) {
      console.log(user.userID);
      //Get category ID
      const q = query(
        this.contactPageCollectionRef,
        where("category", "==", user.category)
      );
      let querySnapshot = await getDocs(q);
      let categoryId = querySnapshot.docs[0].id;
      //Get Document ID
      const check = collection(
        db,
        "contactPage",
        categoryId,
        "contactsList"
      );
      let user_query = query(check, where("userID", "==", user.userID));
      let userDoc = await getDocs(user_query);
      let user_dataID = userDoc.docs[0].id;
      //Delete the user
      const deleteUserData = doc(
        db,
        "contactPage",
        categoryId,
        "contactsList",
        user_dataID
      );
      await deleteDoc(deleteUserData);
      console.log(`User with ID ${user_dataID} deleted`);
      window.location.reload();
    }
  },
  async mounted() {
    await this.fetchCategories()
    await this.fetchUsers()
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const fullName =
          user.firstName.toLowerCase() +
          " " +
          user.surName.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
      // return users.value;
      //.filter(user => user.category === selectedList.value); // replace List with the correct field name
    }
  }

};
</script>


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
