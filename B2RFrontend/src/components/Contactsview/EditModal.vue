<template>
    <a class="btn btn-sm btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#editModal' + id"><i class="fas fa-pencil-alt"></i></a>
    <div class="modal" :id="'editModal' + id" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form id="editContactForm" @submit.prevent="editContact">
          <div class="modal-header">
            <h5 class="modal-title">Edit Info</h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="editedContact.firstName">
              </div>
              <div class="form-group">
                <label for="surName">Last Name</label>
                <input type="text" class="form-control" id="surName" v-model="editedContact.surName">
              </div>
              <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="text" class="form-control" id="phoneNumber" v-model="editedContact.phoneNumber">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" v-model="editedContact.email">
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <input type="text" class="form-control" id="tags" v-model="editedContact.tags">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" class="form-control" id="description" v-model="editedContact.description"></textarea>
              </div>
              <div class="form-group">
                <label for="category">Category</label>
                <select class="form-control" id="category" v-model="editedContact.category">
                  <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>
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
  import { addDoc, updateDoc, collection, doc, deleteDoc, getDocs, query, where } from "firebase/firestore"; 
  import { ref, computed, watchEffect, reactive } from 'vue';
  
  export default {
    props: {
        user: {
            type: Object,
            required: true
        },
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
      
      // call the fetchCategories method on component load
      watchEffect(() => {
        fetchCategories();
      });
  
      return {
        categories
      }
    },
    methods: {
      async editContact() {
      const contactPageCollectionRef = collection(db, "contactPage");
        console.log(this.editedContact.original_category);
        console.log(this.editedContact.category);
      // check if all input fields are filled in
      if (!this.editedContact.firstName || !this.editedContact.surName || !this.editedContact.phoneNumber || !this.editedContact.email || !this.editedContact.tags || !this.editedContact.description) {
        alert('Please fill in all fields');
        return;
      }
      // Update the contact with the new tags
      if (!this.editedContact.tags || !Array.isArray(this.editedContact.tags)) {
        let arraystring = this.editedContact.tags;
        this.editedContact.tags = [];
        this.editedContact.tags = arraystring.split(",");
      }
      
      //check if the category has been changed
      if (this.editedContact.original_category == this.editedContact.category){
        let q = query(contactPageCollectionRef, where("category", "==", this.editedContact.category));
        let querySnapshot = await getDocs(q);
        
        let categoryId = querySnapshot.docs[0].id;
        let check = collection(db, "contactPage", categoryId, "contactsList");
        let user_query = query(check, where("userID", "==", this.user.userID));
        let userDoc = await getDocs(user_query);
        let user_dataID = userDoc.docs[0].id;
        try {
            await updateDoc(doc(db, "contactPage/" + categoryId + "/contactsList/" + user_dataID), this.editedContact);
        } catch (error) {
            console.log("Error adding contact: " + error);
        }
      }else{
        //delete the current doc within the category
        let q = query(contactPageCollectionRef, where("category", "==", this.editedContact.original_category));
        let querySnapshot = await getDocs(q);
        let categoryId = querySnapshot.docs[0].id;
        //Get Document ID
        let check = collection(db, "contactPage", categoryId, "contactsList");
        let user_query = query(check, where("userID", "==", this.editedContact.userID));
        let userDoc = await getDocs(user_query);
        let user_dataID = userDoc.docs[0].id;
        //Delete the user
        const deleteUserData = doc(db,"contactPage", categoryId, "contactsList", user_dataID);
        await deleteDoc(deleteUserData);
        //add the current doc to a new category
        let newCategory = query(contactPageCollectionRef, where("category", "==", this.editedContact.category));
        let newQuerySnapshot = await getDocs(newCategory);
        
        let category_Id = newQuerySnapshot.docs[0].id;
        try {
        await addDoc(collection(db, "contactPage/" + category_Id + "/contactsList"), { 
            userID: this.editedContact.userID,
            firstName: this.editedContact.firstName,
            surName: this.editedContact.surName,
            phoneNumber: this.editedContact.phoneNumber,
            email: this.editedContact.email,
            tags: this.editedContact.tags,
            description: this.editedContact.description,
            category: this.editedContact.category
        });
        } catch (error) {
        console.log("Error adding contact: " + error);
        }
      }
      window.location.reload();
  }
  
    },
    data() {
      return {
        editedContact: {
          userID: this.user.userID,
          firstName: this.user.firstName,
          surName: this.user.surName,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email,
          tags: this.user.tags,
          description: this.user.description,
          category: this.user.category,
          original_category: this.user.category
        }
      }
    }
  }
  </script>
  