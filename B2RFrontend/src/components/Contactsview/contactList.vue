<template>
    <button class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#add_list' + id" ><i class="fas fa-plus"></i></button>
    <div class="modal" :id="'add_list' + id" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form id="addContactList" @submit.prevent="addContactList">
          <div class="modal-header">
            <h5 class="modal-title">Add Contact List</h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label for="listName">List Name:</label>
                <input type="text" class="form-control" id="listName" v-model="listName">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
            <button type="submit" id="contactSubmit" class="btn btn-primary" data-mdb-dismiss="modal">Add Contact</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { db } from "../../firebase";
  import { collection, doc , setDoc } from "firebase/firestore"; 
  import { ref } from 'vue';
  
  export default {
    props: {
      id: String
    },
  
    setup() {
      const categories = ref([]);
      return {
        categories
      }
    },

    methods: {
      async addContactList() {
        if (!this.listName) {
        alert('Please Enter a List Name');
        return;
       }
        
        try {
          // Get a reference to the "contactPage" collection
          const contactPageCollectionRef = collection(db, "contactPage");
          const newDocRef = doc(contactPageCollectionRef);
          const newDocData = { category: this.listName };
          await setDoc(newDocRef, newDocData);
        } catch (error) {
          console.error(error);
        }
        window.location.reload();
      }

    },
    data() {
      return {
        // Automatically Updating whenver ListName Changes
        listName: ""
      }
    }
  }
  </script>