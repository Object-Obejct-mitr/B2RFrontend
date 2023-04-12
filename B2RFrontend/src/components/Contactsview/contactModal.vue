<template>
    <button
        class="btn btn-primary"
        data-mdb-toggle="modal"
        data-mdb-target="#addContactModal"
    >
        Add Contact
    </button>
    <div
        id="addContactModal"
        class="modal modal-lg fade nonGrab container-fluid"
        data-mdb-backdrop="static"
        tabindex="-1"
        role="dialog"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="addContactForm" @submit.prevent="addContact">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Contact</h5>
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
                                v-model="newContact.firstName"
                                notch-width="8ch"
                                label="First Name/Company Name"
                                :is-required="true"
                                class="mt-3 me-2 w-100"
                            />
                            <InputText
                                id="lastName"
                                v-model="newContact.surName"
                                notch-width="8ch"
                                label="Last Name"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputPhoneNumber
                                id="phoneNumber"
                                v-model="newContact.phoneNumber"
                                notch-width="8ch"
                                label="Phone Number"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputEmail
                                id="email"
                                v-model="newContact.email"
                                notch-width="8ch"
                                label="Email"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputChips
                                id="tags"
                                v-model="newContact.tags"
                                notch-width="18ch"
                                label="Tags (Comma Separated)"
                                :is-required="false"
                                class="mt-3 me-2 w-100"
                            />

                            <InputTextArea
                                id="description"
                                v-model="newContact.description"
                                :num-rows="6"
                                label="Description"
                                notch-width="8ch"
                                class="mt-3"
                            />

                            <div class="form-outline mt-3 w-100">
                                <i class="fas fa-angle-down trailing"></i>

                                <select
                                    id="category"
                                    v-model="newContact.category"
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
                            id="addContactSubmit"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Add Contact
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
    collection,
    doc,
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
            newContact: {
                firstName: "",
                surName: "",
                phoneNumber: "",
                email: "",
                tags: [],
                description: "",
                category: "",
            },
        };
    },
    methods: {
        clearInputs() {
            this.newContact.firstName = "";
            this.newContact.surName = "";
            this.newContact.phoneNumber = "";
            this.newContact.email = "";
            this.newContact.tags = [];
            this.newContact.description = "";
            this.newContact.category = "";
            $("#submitSpinner").remove();
            $("#addContactSubmit").prop("disabled", false);
        },
        async addContact() {
            $("#addContactSubmit").prepend(
                '<span id="submitSpinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true">'
            );
            $("#addContactSubmit").prop("disabled", true);
            const contactPageCollectionRef = collection(db, "contactPage");

            let user_id = 0;
            const contactPageSnapshot = await getDocs(
                collection(db, "contactPage")
            );
            for (const pageDoc of contactPageSnapshot.docs) {
                const contactsListSnapshot = await getDocs(
                    collection(pageDoc.ref, "contactsList")
                );
                contactsListSnapshot.forEach((doc) => {
                    user_id += 1;
                });
            }
            user_id += 1;

            // add the new contact to the users array
            const q = query(
                contactPageCollectionRef,
                where("category", "==", this.newContact.category)
            );
            const querySnapshot = await getDocs(q);

            let categoryId = querySnapshot.docs[0].id;
            console.log("CategoryId: " + categoryId);
            await addDoc(
                collection(db, "contactPage/" + categoryId + "/contactsList"),
                {
                    userID: user_id,
                    firstName: this.newContact.firstName,
                    surName: this.newContact.surName,
                    phoneNumber: this.newContact.phoneNumber,
                    email: this.newContact.email,
                    tags: this.newContact.tags,
                    description: this.newContact.description,
                    category: this.newContact.category,
                }
            )
                .then(() => {
                    this.toast.success("Added Task Successfully", {
                        timeout: 2000,
                        position: POSITION.BOTTOM_RIGHT,
                    });

                    $("#addContactModal").modal("hide");
                })
                .catch((error) => {
                    this.toast.error("Error Adding Contact", {
                        timeout: 2000,
                        position: POSITION.BOTTOM_RIGHT,
                    });
                    console.log(error);
                });

            $("#submitSpinner").remove();
            $("#addContactSubmit").prop("disabled", false);
        },
    },
};
</script>
