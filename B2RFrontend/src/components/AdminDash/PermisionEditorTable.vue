<template>
  <div class="table-responsive">
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th>Name</th>
          <th>Assign Role</th>
          <th v-for="(permision, index) in permisions" :key="index">{{ permision }}</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, item_index) in this.users" :key="item_index">
          <td>
            <div class="d-flex align-items-center">
              <img alt="" style="width: 45px; height: 45px" class="rounded-circle" :src="item.photoURL">
              <div class="ms-3">
                <p class="fw-bold mb-1">{{ item.displayName }}</p>
                <p class="text-muted mb-0">{{ item.email }}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" data-mdb-toggle="dropdown"
                aria-expanded="false">Roles</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li v-for="(role, index) in this.roles" :key="index">
                  <a class="dropdown-item" href="#">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="" :id="item_index + item.role"
                        :checked="item.role == role" @click="updateUserRole(item_index, role)"> <label
                        class="form-check-label" :for="item_index + item.role">{{ role }}</label>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </td>
          <td v-for="(permision, permision_index) in this.permisions" :key="permision_index">
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" data-mdb-toggle="dropdown"
                aria-expanded="false">Permsions</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li v-for="(option, index) in options" :key="index">
                  <a class="dropdown-item" href="#">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" :id="item_index + option"
                        :checked="item.permissions.includes(option + permision)"
                        @click="updateUser(item_index, option + permision)"> <label class="form-check-label"
                        :for="item_index + option">{{ option }}</label>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <button class="btn btn-danger" type="button" @click="deleteUser(item_index)">Delete User</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { db } from "../../firebase";
import { collection, doc, getDocs, setDoc, query, where, deleteDoc, orderBy } from "firebase/firestore";
import { ref, computed, watchEffect } from 'vue';
export default {
  async mounted() {
    await this.fetchUsers()
    await this.fetchRoles()
    $(".table-responsive").css({"width": $(window).width()*0.95})
  },
  methods: {
    async fetchUsers() {
      const userlist = collection(db, "users");
      const userQ = query(userlist, orderBy('displayName', 'asc'));
      const querySnapshot = await getDocs(userQ);
      this.users = [];
      querySnapshot.forEach(doc => {
        const user = doc.data();
        user.id = doc.id;
        if (!this.users.includes(user)) {

          this.users.push(user);
        }
      });
    },
    async fetchRoles() {
      const roleList = collection(db, "roles");
      const roleQ = query(roleList, orderBy('Weight', 'asc'));
      const querySnapshotRole = await getDocs(roleQ);
      querySnapshotRole.forEach((doc) => {
        this.roles = [...this.roles, doc.data().Name];
      })
    },
    async deleteUser(usernum) {
      const user = this.users[usernum]; 1
      console.log(user)
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      this.users.splice(usernum, 1);
      deleteDoc(docRef)
        .then(docRef => {
          console.log("Entire Document has been deleted successfully");
        })
        .catch(error => {
          console.log(error);
        })
    },
    async updateUserRole(userNumber, role) {
      const user = this.users[userNumber];
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      if (this.users[userNumber].role == role) {
        this.users[userNumber].role = "";
      }
      else {
        this.users[userNumber].role = role
      }
      setDoc(docRef, this.users[userNumber])
        .then(docRef => {
          console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
          console.log(error);
        })
    },
    async updateUser(userNumber, editupdate) {
      const user = this.users[userNumber];
      const index = user.permissions.indexOf(editupdate);
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      if (index > -1) {
        this.users[userNumber].permissions.splice(index, 1);
      }
      else {
        this.users[userNumber].permissions.push(editupdate);
      }
      setDoc(docRef, this.users[userNumber])
        .then(docRef => {
          console.log("Entire Document has been updated successfully");
        })
        .catch(error => {
          console.log(error);
        })
    },
    isMobile() {
      return $(window).width() < 760
    }
  },
  data() {
    return {
      roles: [],
      users: [],
      options: ["Edit", "Add", "Delete","View"],
      permisions: ["Contacts", "OrgChart", "Blog"],
    }
  }
}
</script>

<style scoped>
.table-responsive {
  overflow-x: scroll;
}
</style>
