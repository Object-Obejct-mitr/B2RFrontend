<template>
    <a
        class="btn btn-sm btn-primary me-2"
        data-mdb-toggle="modal"
        :data-mdb-target="'#editModal' + id"
    ><i class="fas fa-pencil-alt"></i
    ></a>
    <div
        :id="'editModal' + id"
        class="modal modal-lg fade nonGrab container-fluid"
        data-mdb-backdrop="static"
        tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form id="editContactForm" @submit.prevent="editContact">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Info</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column">
                            <InputText
                                id="firstName"
                                v-model="editedContact.firstName"
                                notch-width="19ch"
                                label="First Name/Company Name"
                                :is-required="true"
                                class="mt-3 me-2 w-100"
                            />
                            <InputText
                                id="lastName"
                                v-model="editedContact.surName"
                                notch-width="8ch"
                                label="Last Name"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputPhoneNumber
                                id="phoneNumber"
                                v-model="editedContact.phoneNumber"
                                notch-width="11ch"
                                label="Phone Number"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputEmail
                                id="email"
                                v-model="editedContact.email"
                                notch-width="5ch"
                                label="Email"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />
                            <InputChips
                                id="tags"
                                v-model="editedContact.tags"
                                notch-width="18ch"
                                label="Tags (Comma Separated)"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputTextArea
                                id="description"
                                v-model="editedContact.description"
                                :num-rows="6"
                                label="Description"
                                notch-width="8ch"
                                class="mt-3"
                            />

                            <div class="form-outline mt-3 w-100">
                                <i class="fas fa-angle-down trailing"></i>

                                <select
                                    id="category"
                                    v-model="editedContact.category"
                                    class="form-control active"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select a Category
                                    </option>
                                    <option
                                        v-for="category in categories"
                                        :key="category"
                                        :value="category"
                                    >
                                        {{ category }}
                                    </option>
                                </select>
                                <label class="form-label" for="addComponentName"
                                >Category</label
                                >
                                <div class="form-notch">
                                    <div class="form-notch-leading"></div>
                                    <div
                                        style="width: 7ch"
                                        class="form-notch-middle"
                                    ></div>
                                    <div class="form-notch-trailing"></div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="editedContact.firstName">
            </div>
            <div class="form-group">
              <label for="surName">Last Name</label>
              <input type="text" class="form-control" id="surName" v-model="editedContact.surName">
            </div>
            <div class="form-group">
              <label for="phoneNumber">Phone Number</label>
              <input type="text" class="form-control" id="phoneNumber" v-model="editedContact.phoneNumber">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" id="email" v-model="editedContact.email">
            </div>
            <div class="form-group">
              <label for="tags">Tags</label>
              <input type="text" class="form-control" id="tags" v-model="editedContact.tags">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea type="text" class="form-control" id="description" v-model="editedContact.description"></textarea>
            </div> -->
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-mdb-dismiss="modal"
                            @click="clearInputs"
                        >
                            Cancel
                        </button>
                        <button
                            :id="'editContactSubmit' + id"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase";
import {
    addDoc,
    updateDoc,
    collection,
    doc,
    deleteDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { ref, computed, watchEffect, reactive } from "vue";
import InputText from "../Misc/InputText.vue";
import InputNumber from "../Misc/InputNumber.vue";
import InputTextArea from "../Misc/InputTextArea.vue";
import InputPhoneNumber from "../Misc/InputPhoneNumber.vue";
import InputEmail from "../Misc/InputEmail.vue";
import InputChips from "../Misc/InputChips.vue";
import { useToast, POSITION } from "vue-toastification";

export default {
    components: {
        InputNumber,
        InputText,
        InputTextArea,
        InputPhoneNumber,
        InputEmail,
        InputChips,
    },
    props: {
        user: {
            type: Object,
            required: true,
        },
        id: String,
    },

    setup() {
        const categories = ref([]);
        const contactPageCollectionRef = collection(db, "contactPage");
        const toast = useToast();

        const fetchCategories = async () => {
            categories.value = [];
            const querySnapshot = await getDocs(contactPageCollectionRef);
            querySnapshot.forEach((doc) => {
                const category = doc.data().category;
                if (!categories.value.includes(category)) {
                    categories.value.push(category);
                }
            });
        };

        // call the fetchCategories method on component load
        watchEffect(() => {
            fetchCategories();
        });

        return {
            categories,
            toast,
        };
    },
    data() {
        return {
            userID: this.user.userID,
            firstName: this.user.firstName,
            surName: this.user.surName,
            phoneNumber: this.user.phoneNumber,
            email: this.user.email,
            tags: this.user.tags,
            description: this.user.description,
            category: this.user.category,
            editedContact: JSON.parse(
                JSON.stringify({
                    //Deep copy
                    userID: this.user.userID,
                    firstName: this.user.firstName,
                    surName: this.user.surName,
                    phoneNumber: this.user.phoneNumber,
                    email: this.user.email,
                    tags: this.user.tags,
                    description: this.user.description,
                    category: this.user.category,
                })
            ),
        };
    },
    methods: {
        clearInputs() {
            this.editedContact = JSON.parse(
                JSON.stringify({
                    userID: this.user.userID,
                    firstName: this.user.firstName,
                    surName: this.user.surName,
                    phoneNumber: this.user.phoneNumber,
                    email: this.user.email,
                    tags: this.user.tags,
                    description: this.user.description,
                    category: this.user.category,
                })
            );
            $("#submitSpinner").remove();
            $("#editContactSubmit" + this.id).prop("disabled", false);
        },
        async editContact() {
            $("#editContactSubmit" + this.id).prepend(
                '<span id="submitSpinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true">'
            );
            $("#editContactSubmit" + this.id).prop("disabled", true);
            const contactPageCollectionRef = collection(db, "contactPage");
            console.log(this.editedContact.category);
            // check if all input fields are filled in

            //check if the category has been changed
            if (
                this.editedContact.original_category ==
                this.editedContact.category
            ) {
                let q = query(
                    contactPageCollectionRef,
                    where("category", "==", this.editedContact.category)
                );
                let querySnapshot = await getDocs(q);

                let categoryId = querySnapshot.docs[0].id;
                let check = collection(
                    db,
                    "contactPage",
                    categoryId,
                    "contactsList"
                );
                let user_query = query(
                    check,
                    where("userID", "==", this.user.userID)
                );
                let userDoc = await getDocs(user_query);
                let user_dataID = userDoc.docs[0].id;
                await updateDoc(
                    doc(
                        db,
                        "contactPage/" +
                            categoryId +
                            "/contactsList/" +
                            user_dataID
                    ),
                    this.editedContact
                )
                    .then(() => {
                        this.toast.success("Modified Task Successfully", {
                            timeout: 2000,
                            position: POSITION.BOTTOM_RIGHT,
                        });
                        $("#editModal" + this.id).modal("hide");
                    })
                    .catch((error) => {
                        this.toast.error("Error Adding Contact", {
                            timeout: 2000,
                            position: POSITION.BOTTOM_RIGHT,
                        });
                        console.log(error);
                    });
            } else {
                //delete the current doc within the category
                let q = query(
                    contactPageCollectionRef,
                    where(
                        "category",
                        "==",
                        this.editedContact.original_category
                    )
                );
                let querySnapshot = await getDocs(q);
                let categoryId = querySnapshot.docs[0].id;
                //Get Document ID
                let check = collection(
                    db,
                    "contactPage",
                    categoryId,
                    "contactsList"
                );
                let user_query = query(
                    check,
                    where("userID", "==", this.editedContact.userID)
                );
                let userDoc = await getDocs(user_query);
                let user_dataID = userDoc.docs[0].id;
                //Delete the user
                const deleteUserData = doc(
                    db,
                    "contactPage",
                    categoryId,
                    "contactsList",
                    user_dataID
                );
                await deleteDoc(deleteUserData);
                //add the current doc to a new category
                let newCategory = query(
                    contactPageCollectionRef,
                    where("category", "==", this.editedContact.category)
                );
                let newQuerySnapshot = await getDocs(newCategory);

                let category_Id = newQuerySnapshot.docs[0].id;
                await addDoc(
                    collection(
                        db,
                        "contactPage/" + category_Id + "/contactsList"
                    ),
                    {
                        userID: this.editedContact.userID,
                        firstName: this.editedContact.firstName,
                        surName: this.editedContact.surName,
                        phoneNumber: this.editedContact.phoneNumber,
                        email: this.editedContact.email,
                        tags: this.editedContact.tags,
                        description: this.editedContact.description,
                        category: this.editedContact.category,
                    }
                )
                    .then(() => {
                        this.toast.success("Modified Task Successfully", {
                            timeout: 2000,
                            position: POSITION.BOTTOM_RIGHT,
                        });

                        $("#editModal" + this.id).modal("hide");
                    })
                    .catch((error) => {
                        this.toast.error("Error Adding Contact", {
                            timeout: 2000,
                            position: POSITION.BOTTOM_RIGHT,
                        });
                        console.log(error);
                    });
            }
            $("#submitSpinner").remove();
            $("#editContactSubmit" + this.id).prop("disabled", false);
            // window.location.reload();
        },
    },
};
</script>
