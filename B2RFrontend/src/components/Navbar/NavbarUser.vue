<script setup>
import { onMounted } from "vue";
import router from "../../../src/router";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";
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
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
const signedIn = ref(false);
const user = ref(undefined);
const usersCollection = collection(db, "users");

async function checkExistingUser(user) {
    // Default user constructor
    const userData = {
        displayName: user.providerData[0].displayName,
        permissions: [],
        photoURL: user.providerData[0].photoURL,
        pronouns: "No Pronouns Set",
        role: "Student",
        uid: user.providerData[0].uid,
        email: user.providerData[0].email,
    };
    console.log(userData);
    const q = query(usersCollection, where("uid", "==", userData.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log("User does not exist, creating...");
        await addDoc(collection(db, "users"), {
            displayName: userData.displayName,
            permissions: userData.permissions,
            photoURL: userData.photoURL,
            pronouns: userData.pronouns,
            role: userData.role,
            uid: userData.uid,
            email: userData.email,
        });
        return userData;
    } else {
        console.log("User exists");
        console.log(querySnapshot.docs[0].data());
        return querySnapshot.docs[0].data();
    }
}

async function updateUsername(newUser) {
    if (newUser != undefined) {
        user.value = await checkExistingUser(newUser);
        signedIn.value = true;
        localStorage.setItem("user", JSON.stringify(user.value));
    } else {
        user.value = undefined;
        signedIn.value = false;
        localStorage.removeItem("user");
    }
}

const provider = new GoogleAuthProvider();
const signIn = () => {
    setPersistence(auth, browserSessionPersistence);
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
            localStorage.removeItem("user");
        },
        function (error) {
            console.error("Sign Out Error", error);
            localStorage.removeItem("user");
        }
    );
};
</script>

<template>
    <div v-if="!signedIn" class="d-flex align-items-center">
        <a
            class="btn text-white me-2 btn-success"
            @click="signIn"
            href="#"
            role="button"
        >
            <i class="fab fa-google me-2"></i>
            Sign In With School Email
        </a>
    </div>
    <div v-if="signedIn" class="d-flex align-items-center">
        <div class="d-flex flex-column align-items-center">
            <h4>Welcome, {{ user.displayName }}</h4>
            <div class="d-flex flex-row">
                <RouterLink to="/profile"
                    ><button class="btn btn-primary px-3">
                        View Profile
                    </button></RouterLink
                >
                <button class="btn btn-link px-3" @click="signOutDriver">
                    Sign Out
                </button>
            </div>
        </div>
        <img
            :src="user.photoURL"
            referrerpolicy="no-referrer"
            class="rounded-circle px-3"
            height="80"
        />
    </div>
</template>
