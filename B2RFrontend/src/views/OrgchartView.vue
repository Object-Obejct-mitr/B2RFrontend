<template>
    <main>
        <div class="d-flex flex-row">
            <Sidebar :settings="roles" />
            <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-column mt-5" v-for="(value,key,index) in catigories">
                    <h1 class="text-center" id="{{key}}">{{key+"s"}}</h1>
                    <div class="row mt-5" v-for="i in Math.ceil(value.length/5)">
                        <div v-if="(i-1)*5 < value.length" class="col">
                            <OrgchartUser :user="value[(i-1)*5]"/>
                        </div>
                        <div v-if="(i-1)*5 +1 < value.length" class="col">
                            <OrgchartUser :user="value[(i-1)*5 + 1]"/>
                        </div>
                        <div v-if="(i-1)*5 +2 < value.length" class="col">
                            <OrgchartUser :user="value[(i-1)*5 + 2]"/>
                        </div>
                        <div v-if="(i-1)*5 +3 < value.length" class="col">
                            <OrgchartUser :user="value[(i-1)*5 + 3]"/>
                        </div>
                        <div v-if="(i-1)*5 +4 < value.length" class="col">
                            <OrgchartUser :user="value[(i-1)*5 + 4]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<!-- <template>
     <main>
     <div class="d-flex flex-row">
     <Sidebar />
     <div class="d-flex flex-column flex-fill">
     <div class="d-flex flex-column mt-5">
     <h1 class="text-center">Team Mentors</h1>
     <div class="row mt-3">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     <div class="row mt-5">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     </div>
     <div class="d-flex flex-column mt-5">
     <h1 class="text-center">Team Captains</h1>
     <div class="row mt-3">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     </div>
     <div class="d-flex flex-column mt-5">
     <h1 class="text-center">Component Heads</h1>
     <div class="row mt-3">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     </div>
     <div class="d-flex flex-column mt-5">
     <h1 class="text-center">Manufacturers</h1>
     <div class="row mt-3">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     <div class="row mt-5">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     <div class="row mt-5">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     <div class="row mt-5">
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     <div class="col">
     <OrgchartUser />
     </div>
     </div>
     </div>
     </div>
     </div>
     </main>
     </template>
-->

<script>
 import OrgchartUser from "../components/Orgchart/OrgchartUser.vue";
 import Sidebar from "../components/Navbar/Sidebar.vue";
 import { db } from "../firebase";
import { collection, doc, getDocs,setDoc, query, where } from "firebase/firestore";
import { ref, computed, watchEffect } from 'vue';
 export default{
     setup(){
         const catigories=ref({});
         const roles=["Component Head","Team Mentor","Team Captain", "Manufacture"]
         const fetchUsers = async () => {
         const userList= collection(db,"users");
             for(let role of roles){
                 console.log(role)
                 var temparr=[];
                 const q = query(userList, where("role", "==",role ));
                 const querySnapshot = await getDocs(q);
                 console.log(querySnapshot.docs)
                 for(let user of querySnapshot.docs){
                     temparr.push(user.data());
                 }
                 catigories.value[role]=temparr;
             }
             // const querySnapshot = await getDocs(catigoryList);
             // console.log(catigories.value.Capt)

     }
          watchEffect(() => {
      fetchUsers();
    });
        return{
            roles,
            catigories
        }
     },
     components: {
OrgchartUser,
Sidebar

  }


 }
</script>
