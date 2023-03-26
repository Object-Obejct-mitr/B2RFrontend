<template>
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
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
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addContact">Add Contact</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newContact: {
          firstName: '',
          surName: '',
          phoneNumber: '',
          email: '',
          tags: '',
        },
      };
    },
    methods: {
      addContact() {
        // send new contact data to the server
        // close the modal dialog
      },
    },
  };
  </script>
  