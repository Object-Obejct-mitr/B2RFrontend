<script>
import { onMounted } from "vue";

import { auth, db, storage } from "../../firebase";
import { ref } from "vue";
import { uploadBytesResumable, ref as firebaseRef, getStorage, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { collection, getDocs, query, where, addDoc, doc, updateDoc } from "firebase/firestore"
import InputText from "../Misc/InputText.vue";
import InputPhoneNumber from "../Misc/InputPhoneNumber.vue";
import router from "../../../src/router";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useToast, POSITION } from "vue-toastification";

const provider = new GoogleAuthProvider();
export default {
    components: {
        InputText,
        InputPhoneNumber
    },
    data() {
        return {
            userValue: undefined,
            signedInNew: false,
            profileImageFile: undefined,
            profileImageNewLink: undefined
        }
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    mounted() {
        console.log("Fetching User");
        const data = localStorage.getItem('user');
        console.log(data)
        if (data != undefined) {
            console.log("Found user in local storage");
            this.userValue = JSON.parse(data);
            this.signedInNew = true;
        }

    },
    methods: {
        async saveChanges() {
            const userColl = collection(db, "users");
            const q = query(collection(db, "users"), where("email", "==", this.userValue.email));
            const querySnapshot = await getDocs(q);
            const docID = querySnapshot.docs[0].id;
            if (this.userValue.phoneNumber == undefined){
                this.userValue.phoneNumber = "";
            }
            if (this.userValue.pronouns == undefined){
                this.userValue.pronouns = "";
            }


            await updateDoc(doc(userColl, docID), {
                    displayName: this.userValue.displayName,
                    pronouns: this.userValue.pronouns,
                    phoneNumber: this.userValue.phoneNumber,
                    photoURL: this.userValue.photoURL
                }).then(() => {
                    this.toast.success("Updated Profile Successfully", {
                        timeout: 2000,
                        position: POSITION.BOTTOM_RIGHT
                    })
                    localStorage.setItem("user", JSON.stringify(this.userValue))
                    $("#navBarModal").modal('hide');
                }).catch(error => {
                    console.log("Error, " + error)
                    this.toast.error("An Error Occurred", {
                        timeout: 10000,
                        position: POSITION.BOTTOM_RIGHT
                    });
                });

        },
        undoChanges() {
            if(this.profileImageFile!=undefined){
                let fileName = firebaseRef(storage, this.profileImageNewLink).name;
                let fileRef = firebaseRef(storage, 'profilePhotos/'+fileName);
                deleteObject(fileRef).then(()=>{
                    console.log("Delete Success");
                });
            }
            this.userValue = JSON.parse(localStorage.getItem('user'));
            this.profileImageFile = undefined;
            this.profileImageNewLink = undefined;
            $("#navBarModal").modal('hide');
        }, 
        async changeProfileImage() {
            // Upload new photo to Firestore
            const storageRef = firebaseRef(storage, 'profilePhotos/'+ this.userValue.uid + this.profileImageFile.name); //
            // 'file' comes from the Blob or File API

            const uploadTask = uploadBytesResumable(storageRef, this.profileImageFile);
            uploadTask.on('state_changed', (snapshot) => {
                // Handle state changes if needed
            }, (error) => {
                this.toast.error("Error Uploading Files", {
                    timeout: 10000,
                    position: POSITION.BOTTOM_RIGHT
                });
            }, async () => {
                let newURL = await getDownloadURL(uploadTask.snapshot.ref);
                this.userValue.photoURL = newURL;
                this.profileImageNewLink = newURL;
            });
        },
        async onProfilePhotoSelected(event) {
            this.profileImageFile = event.target.files[0];
            await this.changeProfileImage();
        },
        async checkExistingUser(user) {
            // Check to see if a user exists in our local database.

            const userData = {
                displayName: user.providerData[0].displayName,
                permissions: [],
                photoURL: user.providerData[0].photoURL,
                pronouns: "",
                role: "Student",
                uid: user.providerData[0].uid,
                email: user.providerData[0].email,
                phoneNumber: ""
            }
            console.log(userData)
            const q = query(collection(db, "users"), where("email", "==", userData.email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                // User doesn't exist
                console.log("User does not exist, creating...")
                await addDoc(collection(db, "users"), {
                    displayName: userData.displayName,
                    permissions: userData.permissions,
                    photoURL: userData.photoURL,
                    pronouns: userData.pronouns,
                    role: userData.role,
                    uid: userData.uid,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber
                });
                return userData;
            } else {
                // User does exist
                console.log("User exists")
                console.log(querySnapshot.docs[0].data())
                return querySnapshot.docs[0].data()
            }

        },
        async handleSignIn(newUser) {
            if (newUser != undefined) {
                // If the user isn't undefined (error check)
                this.userValue = await this.checkExistingUser(newUser)
                this.signedInNew = true;
                localStorage.setItem("user", JSON.stringify(this.userValue))
            } else {
                user.value = undefined;
                signedIn.value = false;
                localStorage.removeItem("user")
            }
        },
        signOutDriver() {
            signOut(auth).then(() => {
                console.log("Signed Out");
                this.signedInNew = false;
                this.userValue = undefined;
                router.go(0);
                localStorage.removeItem("user")
            }).catch((error) => {
                console.log("Signout Error, ");
                console.log(error)
            });
        },
        async signInDriver() {
            setPersistence(auth, browserSessionPersistence);
            await signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    this.handleSignIn(result.user);
                })
                .catch((error) => {
                    console.log(error);
                    // Handle Errors here.
                });
        },
        handlePFPClick() {
            this.$refs.fileInput.click();
        },

    }

}

</script>

<template>
    <div v-if="!this.signedInNew" class="d-flex align-items-center">
        <a class="btn text-white me-2 btn-success" @click="signInDriver" href="#" role="button">
            <i class="fab fa-google me-2"></i>
            Sign In With School Email
        </a>

    </div>
    <div v-if="this.signedInNew" class="d-flex align-items-center">
        <div class="d-flex flex-column align-items-center">
            <h4>Welcome, {{ this.userValue.displayName }}</h4>
            <div class="d-flex flex-row">
                <button class="btn btn-primary px-3" data-mdb-toggle="modal" data-mdb-target="#navBarModal">
                    View Profile
                </button>
                <button class="btn btn-link px-3" @click="signOutDriver">
                    Sign Out
                </button>
            </div>
        </div>

        <img :src="this.userValue.photoURL" referrerpolicy="no-referrer" class="rounded-circle px-3" height="80" />
        <div class="modal fade" id="navBarModal" tabindex="-1" aria-labelledby="navBarModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="navBarModalLabel">Update Profile</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column align-items-center">
                            <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light"
                                style="max-width: 22rem;" v-on:click="handlePFPClick">
                                <img :src="this.userValue.photoURL" alt="" style="width: 150px; height: 150px"
                                    class="rounded-circle mb-2" />

                                <div class="mask text-light d-flex justify-content-center flex-column text-center rounded-circle"
                                    style="background-color: rgba(0, 0, 0, 0.5); width: 150px; height: 150px">
                                    <h4><i class="fas fa-camera"></i></h4>
                                    <p class="m-0">Upload New</p>
                                </div>
                                <input type="file" ref="fileInput" accept="image/*" style="display: none"
                                    @change="onProfilePhotoSelected">

                            </div>
                            <InputText notchWidth="10ch" id="updateDisplayName" label="Display Name"
                                v-model="this.userValue.displayName" :isRequired="true" class="mb-3" />
                            <InputPhoneNumber notchWidth="8ch" id="updatePhoneNumber" label="Phone Number"
                                v-model="this.userValue.phoneNumber" :isRequired="false" class="mb-3" />
                            <InputText notchWidth="7ch" id="updateUserPronouns" label="Pronouns"
                                v-model="this.userValue.pronouns" :isRequired="false" />

                            <p class="text-muted mb-0">{{ this.userValue.email }}</p>
                            <p class="text-muted mb-0">{{ this.userValue.role }}</p>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="undoChanges">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  -->
</template>
