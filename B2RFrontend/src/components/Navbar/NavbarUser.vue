<script setup>
import { onMounted } from "vue";
import router from "../../../src/router";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../../firebase";

onMounted(async () => {
    //If a user exists in local storage, pull from there
    // console.log(JSON.stringify(localStorage.getItem("user")))
    if (localStorage.getItem("user") != undefined) {
        //console.log(JSON.parse(localStorage.getItem("user")));
        //populateUsername(JSON.parse(localStorage.getItem("user")));
        user.value = JSON.parse(localStorage.getItem("user"));
        signedIn.value = true;
        //updateUsername(JSON.parse(localStorage.getItem("user")));

    } else {
        //Else, get the fresh user
        onAuthStateChanged(auth, (user) => {
            updateUsername(user);
        });
        // let newUser = await getCurrentUser();
        // updateUsername(newUser);
    }

});

</script>

<script>
import { auth, db } from "../../firebase";
import { ref } from "vue";
import {uploadBytes, ref as storageRef, getStorage,getDownloadURL} from 'firebase/storage'
import { collection, getDocs, query, where, addDoc,doc, setDoc } from "firebase/firestore"
const signedIn = ref(false); 
const user = ref(undefined);
const imageData=ref(null);
const picture= ref(null);
const uploadValue= ref(0);
const usersCollection = collection(db, "users");
const file=ref(null);
const get2= (event)=>{
     file.value=event.target.files[0];
 }
const profileEditor= ()=> {
     var pronouns=document.getElementById("Pronouns").value.trim();
     const storage = getStorage();
     const storageR = storageRef(storage,"/userpictures/"+user.value.uid);
     if(pronouns!=""){
         user.value.pronouns=pronouns;
     }
// 'file' comes from the Blob or File API
uploadBytes(storageR,file.value).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
getDownloadURL(storageRef(storage,"/userpictures/"+user.value.uid)).then((url)=>{
     user.value.photoURL=url;
     const docRef = doc(db, "users", user.value.uid);
     console.log(user.value.uid);
setDoc(docRef, user.value)
.then(docRef => {
    console.log("Entire Document has been updated successfully");
})
.catch(error => {
    console.log(error);
})


 })
}

async function checkExistingUser(user) {

    
    // Default user constructor 
    const userData = {
        displayName: user.providerData[0].displayName,
        permissions: [],
        photoURL: user.providerData[0].photoURL,
        pronouns: "No Pronouns Set",
        role: "Student",
        uid: user.providerData[0].uid,
        email: user.providerData[0].email
    }
    console.log(userData)
    const q = query(usersCollection, where("uid", "==", userData.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log("User does not exist, creating...")
        await addDoc(collection(db, "users"), {
            displayName: userData.displayName, 
            permissions: userData.permissions,
            photoURL: userData.photoURL,
            pronouns: userData.pronouns,
            role: userData.role,
            uid: userData.uid,
            email: userData.email
        });
        return userData;
    } else {
        console.log("User exists")
        console.log(querySnapshot.docs[0].data())
        return querySnapshot.docs[0].data()
    }

}

async function updateUsername(newUser) {
    if (newUser != undefined) {
        user.value = await checkExistingUser(newUser)
        signedIn.value = true;
        localStorage.setItem("user", JSON.stringify(user.value))
    } else {
        user.value = undefined;
        signedIn.value = false;
        localStorage.removeItem("user")
    }
};

const provider = new GoogleAuthProvider();
const signIn = () => {
    setPersistence(auth, browserSessionPersistence)
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            updateUsername(result.user);
        })
        .catch((error) => {
            console.log(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
};

const signOutDriver = () => {
    signOut(auth).then(
        function () {
            console.log("Signed Out");
            signedIn.value = false;
            user.value = undefined;
            router.go(0);
            localStorage.removeItem("user")

        },
        function (error) {
            console.error("Sign Out Error", error);
            localStorage.removeItem("user")
        }
    );
};

</script>

<template>
    <div v-if="!signedIn" class="d-flex align-items-center">
        <a class="btn text-white me-2 btn-success" @click="signIn" href="#" role="button">
            <i class="fab fa-google me-2"></i>
            Sign In With School Email
        </a>

    </div>
    <div v-if="signedIn" class="d-flex align-items-center">
        <div class="d-flex flex-column align-items-center">
            <h4>Welcome, {{ user.displayName }}</h4>
            <div class="d-flex flex-row">
                <button class="btn btn-primary px-3" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        View Profile
                    </button>
                <button class="btn btn-link px-3" @click="signOutDriver">
                    Sign Out
                </button>
            </div>
        </div>
        <img :src="user.photoURL" referrerpolicy="no-referrer" class="rounded-circle px-3" height="80" />
    </div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

<div class="form-outline">
    <label class="form-label" for="customFile">Please Upload New Profile Picture</label>
    <input type="file" class="form-control" id="customFile" ref="ProfilePic" @change="get2" accept="image/*"/>
</div>
<div class="form-outline">
  <input id="Pronouns" type="text" class="form-control form-control-lg" />
  <label class="form-label" for="Pronouns" >Enter new pronouns</label>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="profileEditor">Save changes</button>
      </div>
    </div>
  </div>
  </div>
</template>
