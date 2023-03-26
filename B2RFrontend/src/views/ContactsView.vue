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
                <a href="#" class="list-group-item list-group-item-action py-2 ripple" @click.prevent="selectList('mentors')">
                  <i class="fas fa-chart-area fa-fw me-3"></i><span>Mentors</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action py-2 ripple">
                  <i class="fas fa-lock fa-fw me-3"></i><span>Barn2Robotics Faculty</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div class="col-lg-9">
          <AddContactModal id="" :show-modal="showModal" @add-contact="addContact"></AddContactModal>
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
                  <i class="fas fa-align-justify"></i></a>                    
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

  </style>
  
  <script>
  import AddContactModal from '@/components/Contactsview/contactModal.vue';
  import userData from '@/assets/ContactData.json';
  import { ref, computed } from 'vue';  
  
  export default {
    components: {
        AddContactModal
    },
    setup() {
  const selectedList = ref('all');
  const toggleUserDesc = (user) => {
    const userDesc = document.getElementById('userDesc' + user.UserID);
    const isCollapsed = userDesc.classList.contains('show');
    isCollapsed ? userDesc.classList.remove('show') : userDesc.classList.add('show');
  };

  const filteredUsers = computed(() => {
    if (selectedList.value === 'all') {
      return userData.users;
    } else if (selectedList.value === 'mentors') {
      return userData.users.filter(user => user.List.includes('mentors'));
    } else {
      return [];
    }
  });

  const selectList = (list) => {
    selectedList.value = list;
  };

  const showModal = ref(false); // add this line to create a reactive variable to control the visibility of the modal

  const toggleModal = () => { // add this function to toggle the visibility of the modal
    showModal.value = !showModal.value;
  }

  return {
    selectedList,
    filteredUsers,
    selectList,
    toggleUserDesc,
    showModal, // add the new reactive variable to the returned object
    toggleModal // add the new function to the returned object
  }
}

  }


  </script>
  