import InputNotch from '../Misc/InputNotch.vue';

import { useToast, POSITION } from "vue-toastification";

import { db, storage } from "../../firebase"

import { collection, getDocs, query, where, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export default {
    setup() {
        // Get toast interface
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            Name: '',
            Component: 'Select a Component',
            Description: '',
            Designer: '',
            DesiredQuantity: '',
            LeadWorker: '',
            Priority: '',
            Quantity: '',
            CADFiles: [],
            Photos: []
        };

    },
    methods: {
        onPhotoSelected(event) {
            this.Photos = event.target.files;
            console.log(this.Photos);
        },
        onCadFileSelected(event) {
            this.CADFiles = event.target.files;
        },

        async handleSubmit() {
            $("#submitData").prepend("<span id=\"submitSpinner\" class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\">")
            $("#submitData").prop("disabled", true);
            // //Steps: Check to see if the component exists, if it does, then fetch its id and add a task to the ToDo section
            const documentCollection = collection(db, "ProgressViewTasks");
            const q = query(documentCollection, where("ComponentName", "==", this.Component));
            const querySnapshot = await getDocs(q);
            let categoryId = '';

            if (querySnapshot.empty) {
                console.log("Error, component " + this.Component + " does not exist")
            } else {
                categoryId = querySnapshot.docs[0].id;
            }

            if (categoryId != '') {
                const cadPromises = Array.from(this.CADFiles).map(async file => {
                    const storageRef = ref(storage, 'files/' + file.name);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    return new Promise((resolve, reject) => {
                        uploadTask.on('state_changed', (snapshot) => {
                            // Handle state changes if needed
                        }, (error) => {
                            this.toast.error("Error Uploading Files", {
                                timeout: 10000,
                                position: POSITION.BOTTOM_RIGHT
                            });
                            reject(error);
                        }, async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        });
                    });
                });

                const photoPromises = Array.from(this.Photos).map(async file => {
                    const storageRef = ref(storage, 'images/' + file.name);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    return new Promise((resolve, reject) => {
                        uploadTask.on('state_changed', (snapshot) => {
                            // Handle state changes if needed
                        }, (error) => {
                            this.toast.error("Error Uploading Files", {
                                timeout: 10000,
                                position: POSITION.BOTTOM_RIGHT
                            });
                            reject(error);
                        }, async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        });
                    });
                });

                const photoDownloadUrls = await Promise.all(photoPromises);
                const cadDownloadUrls = await Promise.all(cadPromises);

                await addDoc(collection(db, "ProgressViewTasks/" + categoryId + "/ToDo"), {
                    Name: this.Name, //Don't include component here, component is used elsewhere
                    Description: this.Description,
                    Designer: this.Designer,
                    DesiredQuantity: this.DesiredQuantity,
                    LeadWorker: this.LeadWorker,
                    Priority: this.Priority,
                    Quantity: this.Quantity,
                    Photos: photoDownloadUrls,
                    CADFiles: cadDownloadUrls
                });
                this.toast.success("Added Task Successfully", {
                    timeout: 2000,
                    position: POSITION.BOTTOM_RIGHT
                });
                $("#addTaskModal").modal('hide');

            } else {
                this.toast.error("Component Does Not Nxist", {
                    timeout: 10000,
                    position: POSITION.BOTTOM_RIGHT
                });
            }
            $("#submitSpinner").remove();
            $("#submitData").prop("disabled", false);

            
        }
    },
    components: { InputNotch }
};