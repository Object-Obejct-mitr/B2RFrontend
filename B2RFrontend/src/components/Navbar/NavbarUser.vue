<script setup>
import { onMounted } from "vue";
import router from "../../../src/router";
import { useCurrentUser, getCurrentUser } from "vuefire";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import GSignInButton from "vue-google-signin-button";

onMounted(async () => {
    let newUser = await getCurrentUser();
    //console.log(newUser.providerData)
    updateUsername(newUser);
});
</script>

<script>
import { auth } from "../../firebase";
import { ref } from "vue";
const signedIn = ref(false);
const user = ref(undefined);

const updateUsername = (newUser) => {
    if (newUser != undefined) {
        user.value = newUser;
        signedIn.value = true;
    } else {
        user.value = undefined;
        signedIn.value = false;
    }
};

const provider = new GoogleAuthProvider();
const signIn = () => {
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
        },
        function (error) {
            console.error("Sign Out Error", error);
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
