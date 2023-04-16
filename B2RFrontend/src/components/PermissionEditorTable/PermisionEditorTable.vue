<template>
  <table class="table align-middle mb-0 bg-white">
    <thead class="bg-light">
      <tr>
        <th>Name</th>
        <th v-for="permision in permisions">{{ permision }}</th>
        <th>Role</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, item_index) in users">
        <td>
          <div class="d-flex align-items-center">
            <img alt="" style="width: 45px; height: 45px" class=
            "rounded-circle" :src="item.photoURL">
            <div class="ms-3">
              <p class="fw-bold mb-1">{{item.displayName}}</p>
              <p class="text-muted mb-0">{{item.email}}</p>
            </div>
          </div>
        </td>
                <td v-for="(permision,permision_index) in permisions">
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type=
            "button" data-mdb-toggle=
            "dropdown" aria-expanded="false">Permsions</button>
            <ul class="dropdown-menu" aria-labelledby=
            "dropdownMenuButton">
              <li v-for="option in options">
                <a class="dropdown-item" href="#">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
value="" :id="item_index+option" :checked="item.permissions.includes(option+permision)" @click="updateUser(item_index,option+permision)"> <label class=
                  "form-check-label" :for="item_index+option" >{{option}}</label>
                </div></a>
              </li>
            </ul>
          </div>
        </td>
        <td>
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type=
            "button" data-mdb-toggle=
            "dropdown" aria-expanded="false">Roles</button>
            <ul class="dropdown-menu" aria-labelledby=
            "dropdownMenuButton">
              <li v-for="role in roles">
                <a class="dropdown-item" href="#">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
value="" :id="item_index+item.role" :checked="item.role==role" @click="updateUserRole(item_index,role)"> <label class=
                  "form-check-label" :for="item_index+item.role">{{role}}</label>
                </div></a>
              </li>
            </ul>
          </div>
        </td>

        <td>
            <button class="btn btn-danger" type=
            "button"  @click="deleteUser(item_index)">Delete User</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { db } from "../../firebase";
import { collection, doc, getDocs,setDoc, query, where,deleteDoc } from "firebase/firestore";
import { ref, computed, watchEffect } from 'vue';
 export default{
     setup(){
        const users = ref([]);
        const fetchUsers = async () => {
        const userlist= collection(db,"users");
         const querySnapshot = await getDocs(userlist);
        users.value=[];
        querySnapshot.forEach(doc => {
          const user = doc.data();
            user.id=doc.id;
            if(!users.value.includes(user)){

            users.value.push(user);
          }
        });
      };

        //fetchUsers();
         watchEffect(() => {
      fetchUsers();
    });
       const updateUser= (userNumber,editupdate)=>{
         const user=users.value[userNumber];
         const index = user.permissions.indexOf(editupdate);
         const docRef = doc(db, "users", user.uid);
         if (index > -1) {
           users.value[userNumber].permissions.splice(index, 1);
         }
         else{
           console.log(users.value[userNumber].permissions)
           users.value[userNumber].permissions.push(editupdate);
         }
         setDoc(docRef,users.value[userNumber])
           .then(docRef => {
             console.log("Entire Document has been updated successfully");
           })
         .catch(error => {
           console.log(error);
         })
       }
       const updateUserRole= (userNumber, role)=>{
         const user=users.value[userNumber];
         const docRef = doc(db, "users", user.uid);
         if(users.value[userNumber].role==role){
             users.value[userNumber].role="";
         }
         else{
             users.value[userNumber].role=role
         }
         setDoc(docRef,users.value[userNumber])
           .then(docRef => {
             console.log("Entire Document has been updated successfully");
           })
         .catch(error => {
           console.log(error);
         })
       }
       const deleteUser= (usernum)=>{
         const user=users.value[usernum];1
           console.log(user)
         const docRef = doc(db, "users", user.id);
         users.value.splice(usernum,1);
         deleteDoc(docRef)
           .then(docRef => {
             console.log("Entire Document has been deleted successfully");
           })
         .catch(error => {
           console.log(error);
         })
       }


        return{
          permisions:["Contacts","OrgChart","Blog"],
          options:["Edit","Add","Delete"],
          roles:["Component Head","Team Mentor","Team Captain", "Manufacture"],
          users,
          updateUserRole,
          updateUser,
          deleteUser
        }
     }
 }
</script>
