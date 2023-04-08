<!-- <script> -->
<!-- </script> -->
<template>
    <div class="d-flex flex-row">
        <Sidebar />
    </div>
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
     </template> -->
<script>
import OrgchartUser from "../components/Orgchart/OrgchartUser.vue";
import Sidebar from "../components/Navbar/Sidebar.vue";
 import { db } from "../firebase";
import { collection, doc, getDocs,setDoc, query, where } from "firebase/firestore";
import { ref, computed, watchEffect } from 'vue';
 export default{
     setup(){
         const catigories=ref({});
         const fetchUsers = async () => {
         const catigoryList= collection(db,"OrgChart");
         const querySnapshot = await getDocs(catigoryList);
        catigories.value={};
        querySnapshot.forEach(doc => {
        catigories.value[doc.data().Position]=[];
            // for(let user in doc.data().Contact){
            // console.log(user.data());
            // console.log("HI");
            // }

            var s=doc.data()
            console.log(s.Contact);
            const companyDocumentSnapShot2 = db.doc(s.Contact[0].path).get().await();
            // if(s.Contact[0]){s.Contact[0].get().then(res=>{
            // console.log(res.data())
            // })}
            // if(!users.value.includes(user)){
            //     console.log(users.value);
            //     users.value.push(user);
            // }
        });
      };
        fetchUsers();
         // watchEffect(() => {
         // fetchUsers();
         // });


     }
 }
</script>
