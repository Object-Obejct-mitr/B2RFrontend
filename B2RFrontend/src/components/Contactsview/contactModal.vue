<template>
  <button class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#contactModal' + id" >Add Contact</button>
  <div class="modal" :id="'contactModal' + id" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form id="addContactForm" @submit.prevent="addContact">
        <div class="modal-header">
          <h5 class="modal-title">Add Contact</h5>
          <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="newContact.firstName">
            </div>
            <div class="form-group">
              <label for="surName">Last Name</label>
              <input type="text" class="form-control" id="surName" v-model="newContact.surName">
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input type="text" class="form-control" id="phoneNumber" v-model="newContact.phoneNumber">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" id="email" v-model="newContact.email">
            </div>
            <div class="form-group">
              <label for="tags">Tags</label>
              <input type="text" class="form-control" id="tags" v-model="newContact.tags">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea type="text" class="form-control" id="description" v-model="newContact.description"></textarea>
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <select class="form-control" id="category" v-model="newContact.category">
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
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore"; 
import { ref, computed, watchEffect, reactive } from 'vue';

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
    
    // call the fetchCategories method on component load
    watchEffect(() => {
      fetchCategories();
    });

    return {
      categories
    }
  },
  methods: {
    async addContact() {
    const contactPageCollectionRef = collection(db, "contactPage");

    // check if all input fields are filled in
    if (!this.newContact.firstName || !this.newContact.surName || !this.newContact.phoneNumber || !this.newContact.email || !this.newContact.tags || !this.newContact.description) {
      alert('Please fill in all fields');
      return;
    }

    let user_id = 0;
    const contactPageSnapshot = await getDocs(collection(db, 'contactPage'));
          for (const pageDoc of contactPageSnapshot.docs) {
            const contactsListSnapshot = await getDocs(collection(pageDoc.ref, 'contactsList'));
            contactsListSnapshot.forEach(doc => {
              user_id += 1;
            });
          }
    user_id += 1;
    
    // add the new contact to the users array
    const q = query(contactPageCollectionRef, where("category", "==", this.newContact.category));
    const querySnapshot = await getDocs(q);
    
    let categoryId = querySnapshot.docs[0].id;
    console.log("CategoryId: " + categoryId);
    try {
      await addDoc(collection(db, "contactPage/" + categoryId + "/contactsList"), { 
        userID: user_id,
        firstName: this.newContact.firstName,
        surName: this.newContact.surName,
        phoneNumber: this.newContact.phoneNumber,
        email: this.newContact.email,
        tags: this.newContact.tags.split(',').map(tag => tag.trim()),
        description: this.newContact.description,
        category: this.newContact.category
      });
    } catch (error) {
      console.log("Error adding contact: " + error);
    }
    window.location.reload();
}

  },
  data() {
    return {
      newContact: {
        firstName: '',
        surName: '',
        phoneNumber: '',
        email: '',
        tags: '',
        description: '',
        category: ''
      }
    }
  }
}
</script>
