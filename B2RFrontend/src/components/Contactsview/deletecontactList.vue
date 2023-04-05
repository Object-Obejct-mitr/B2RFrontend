<template>
    <button class="btn btn-danger" data-mdb-toggle="modal" :data-mdb-target="'#delete_list' + id"><i class="fas fa-minus"></i></button>
    <div class="modal" :id="'delete_list' + id" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form id="deleteContactList" @submit.prevent="deleteContactList">
            <div class="modal-header">
              <h5 class="modal-title">Delete Contact List</h5>
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="category">Category</label>
                <select class="form-control" id="category" v-model="deleteList.category">
                  <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
              <button type="submit" id="contactSubmit" class="btn btn-primary" data-mdb-dismiss="modal">Delete Contact List</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../../firebase";
  import { collection, doc, query, getDocs, deleteDoc, where } from "firebase/firestore";
  import { ref } from 'vue';
  
  export default {
    props: {
      id: String
    },
  
    setup() {
      const categories = ref([]);
      const contactPageCollectionRef = collection(db, "contactPage");
  
      const fetchCategories = async () => {
        categories.value = [];
        const querySnapshot = await getDocs(contactPageCollectionRef);
        querySnapshot.forEach(doc => {
          const category = doc.data().category;
          if (!categories.value.includes(category)) {
            categories.value.push(category);
          }
        });
      };
  
      fetchCategories();
  
      return {
        categories
      }
    },
  
    methods: {
      async deleteContactList() {
        if (!this.deleteList.category) {
        alert('Please Choose a List');
        return;
       }
        try {
          // Get a reference to the "contactPage" collection
        console.log("hello");
        const contactPageCollectionRef = collection(db, "contactPage");
        const q = query(contactPageCollectionRef, where("category", "==", this.deleteList.category));
        let querySnapshot = await getDocs(q);
        let categoryId = querySnapshot.docs[0].id;
        const deleteUserData = doc(db,"contactPage", categoryId);
        await deleteDoc(deleteUserData);
        } catch (error) {
          console.error(error);
        }
        window.location.reload();
      }
  
    },
    data() {
        return {
            deleteList: {
            category: ''
            }
        }
}
  }
  </script>
  