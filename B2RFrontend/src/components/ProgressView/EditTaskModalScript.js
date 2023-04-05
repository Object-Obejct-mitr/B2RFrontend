import InputText from '../Misc/InputText.vue';
import InputTextArea from '../Misc/InputTextArea.vue';
import InputNumber from '../Misc/InputNumber.vue';
import { collection, getDocs, query, where, updateDoc, doc, setDoc, deleteDoc  } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject  } from "firebase/storage"
import { db, storage } from "../../firebase"
import { useToast, POSITION } from "vue-toastification";


export default {
    props: {
        id: String,
        data: Object,
        componentName: String,
        buttonClass: String
    },
    data() {
        return {
            Name: this.data.Name,
            Component: this.data.Component,
            Description: this.data.Description,
            Designer: this.data.Designer,
            DesiredQuantity: this.data.DesiredQuantity,
            LeadWorker: this.data.LeadWorker,
            Priority: this.data.Priority,
            Quantity: this.data.Quantity,
            CADFiles: this.data.CADFiles,
            Photos: this.data.Photos,
            Status: this.data.Status,
            CatID: this.data.CatID,
            NewPhotos: [],
            NewCADFiles: [],
            DeletedCADFiles: [],
            DeletedPhotos: [],
            ModifiedState: JSON.parse(JSON.stringify({
                Name: this.data.Name,
                Component: this.data.Component,
                Description: this.data.Description,
                Designer: this.data.Designer,
                DesiredQuantity: this.data.DesiredQuantity,
                LeadWorker: this.data.LeadWorker,
                Priority: this.data.Priority,
                Quantity: this.data.Quantity,
                CADFiles: this.data.CADFiles,
                Photos: this.data.Photos,
                Status: this.data.Status,
                CatID: this.data.CatID,
                NewPhotos: [],
                NewCADFiles: [],
                DeletedCADFiles: [],
                DeletedPhotos: []
            }))
        }
    },
    components: { InputText, InputTextArea, InputNumber },
    setup() {
        // Get toast interface
        const toast = useToast();
        return { toast }
    },
    methods: {
        isMobile() {
            return $(window).width() < 760;
        },
        revertState() {
            console.log(this.ModifiedState);
            this.ModifiedState = JSON.parse(JSON.stringify({
                Name: this.data.Name,
                Component: this.data.Component,
                Description: this.data.Description,
                Designer: this.data.Designer,
                DesiredQuantity: this.data.DesiredQuantity,
                LeadWorker: this.data.LeadWorker,
                Priority: this.data.Priority,
                Quantity: this.data.Quantity,
                CADFiles: this.data.CADFiles,
                Photos: this.data.Photos,
                Status: this.data.Status,
                CatID: this.data.CatID,
                NewPhotos: [],
                NewCADFiles: [],
                DeletedCADFiles: [],
                DeletedPhotos: []
            }))
        },
        applyRegex(inputString) {
            const regex = new RegExp("..*%2F(.*?)\?alt");
            const matches = inputString.match(regex);
            if (matches) {

                return matches[1].substring(0, matches[1].lastIndexOf("%"));
            } else {
                return "Regex Error";
            }
        },
        onPhotoSelected(event) {
            const photos = Array.from(event.target.files);
            this.ModifiedState.NewPhotos = Array.from(this.ModifiedState.NewPhotos.concat(photos));
        },
        deletePhotoFromExisting(index) {
            this.ModifiedState.DeletedPhotos.push(this.ModifiedState.Photos[index]);
            this.ModifiedState.Photos.splice(index, 1);
        },
        deletePhotoFromNew(index) {
            this.ModifiedState.NewPhotos.splice(index, 1);
        },
        onCADFileSelected(event) {
            const CADFiles = Array.from(event.target.files);
            this.ModifiedState.NewCADFiles = Array.from(this.ModifiedState.NewCADFiles.concat(CADFiles));
        },
        deleteFileFromExisting(index) {
            this.ModifiedState.DeletedCADFiles.push(this.ModifiedState.CADFiles[index]);
            this.ModifiedState.CADFiles.splice(index, 1);
        },
        deleteFileFromNew(index) {
            this.ModifiedState.NewCADFiles.splice(index, 1);
        },
        deleteTask() {
            // console.log("Files Added:");
            // console.log(this.ModifiedState.NewPhotos);
            // console.log(this.ModifiedState.NewCADFiles);
            // console.log(Array.from(this.ModifiedState.NewPhotos));
            // console.log(Array.from(this.ModifiedState.NewCADFiles));
            // console.log("Files Removed:");
            // console.log(Array.from(this.ModifiedState.DeletedCADFiles));
            // console.log(Array.from(this.ModifiedState.DeletedPhotos));
            // console.log("Modified Task Data:");
            const regex = new RegExp("..*%2F(.*?)\?alt");
            Array.from(this.CADFiles).forEach(element => {
                let fileName = ref(storage, element).name;

                let fileRef = ref(storage, 'files/'+fileName);
                deleteObject(fileRef).then(() => {
                  }).catch((error) => {
                    console.log("Delete Error with file " +element);
                    console.log("Assumed Name: " + fileName);
                  });
            })
            Array.from(this.Photos).forEach(element => {
                let fileName = ref(storage, element).name;

                let fileRef = ref(storage, 'images/'+fileName);
                deleteObject(fileRef).then(() => {
                  }).catch((error) => {
                    console.log("Delete Error with image " +element);
                    console.log("Assumed Name: " + fileName);
                  });
            })
            deleteDoc(doc(db, "ProgressViewTasks/" + this.CatID + "/" + this.Status, this.data.ID)).then(() => {
                this.toast.success("Removed Task Successfully", {
                    timeout: 2000,
                    position: POSITION.BOTTOM_RIGHT
                })
                
                $("#taskModal" + this.id).modal('hide');
            }).catch(error => {
                console.log("Error, " + error)
                this.toast.error("An Error Occurred", {
                    timeout: 10000,
                    position: POSITION.BOTTOM_RIGHT
                });
            });
        },
        async handleSubmit() {
            console.log("ACK");
            $("#submitData" + this.id).prepend("<span id=\"submitSpinner\" class=\"spinner-border spinner-border-sm\" role=\"status\" aria-hidden=\"true\">")
            $("#submitData" + this.id).prop("disabled", true);

            if (this.ModifiedState.Component != this.Component) {
                // Move the document by deleting it and remaking it (no better option provided by firebase, but still low cost)
                console.log("Moving to new category");

                const newDocumentObject = collection(db, "ProgressViewTasks");
                const q = query(newDocumentObject,
                    where("ComponentName", "==", this.ModifiedState.Component)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("Error, component " + this.ModifiedState.Component + " does not exist")
                    this.ModifiedState.CatID = '';
                } else {
                    this.ModifiedState.CatID = querySnapshot.docs[0].id;
                }

                if (this.ModifiedState.categoryId != '') {

                    await setDoc(doc(db, "ProgressViewTasks/" + this.ModifiedState.CatID + "/" + this.ModifiedState.Status, this.data.ID), {
                        Name: this.ModifiedState.Name,
                        Description: this.ModifiedState.Description,
                        Designer: this.ModifiedState.Designer,
                        DesiredQuantity: this.ModifiedState.DesiredQuantity,
                        LeadWorker: this.ModifiedState.LeadWorker,
                        Priority: this.ModifiedState.Priority,
                        Quantity: this.ModifiedState.Quantity,
                        Photos: this.ModifiedState.Photos,
                        CADFiles: this.ModifiedState.CADFiles,
                        id: this.data.ID,
                        Hidden: this.data.Hidden
                    }).then(() => {
                        console.log("Added, deleting old:");
                        deleteDoc(doc(db, "ProgressViewTasks/" + this.CatID + "/" + this.Status, this.data.ID)).then(() => {
                            this.toast.success("Modified Task Successfully", {
                                timeout: 2000,
                                position: POSITION.BOTTOM_RIGHT
                            })
                            $("#taskModal" + this.id).modal('hide');
                        }).catch(error => {
                            console.log("Error during delete, " + error)
                            this.toast.error("An Error Occurred When Moving The Task", {
                                timeout: 10000,
                                position: POSITION.BOTTOM_RIGHT
                            });
                        });
                        $("#taskModal" + this.id).modal('hide');;
                    });

                } else {
                    this.toast.error("Component Does Not Exist", {
                        timeout: 10000,
                        position: POSITION.BOTTOM_RIGHT
                    });
                }

            } else {
                // Edit the existing task listing
                console.log("Editing in same category");

                let documentObject = collection(db, "ProgressViewTasks/" + this.ModifiedState.CatID + "/" + this.ModifiedState.Status);

                await updateDoc(doc(documentObject, this.data.ID), {
                    Name: this.ModifiedState.Name,
                    Description: this.ModifiedState.Description,
                    Designer: this.ModifiedState.Designer,
                    DesiredQuantity: this.ModifiedState.DesiredQuantity,
                    LeadWorker: this.ModifiedState.LeadWorker,
                    Priority: this.ModifiedState.Priority,
                    Quantity: this.ModifiedState.Quantity,
                }).then(() => {
                    this.toast.success("Modified Task Successfully", {
                        timeout: 2000,
                        position: POSITION.BOTTOM_RIGHT
                    })
                    $("#taskModal" + this.id).modal('hide');
                }).catch(error => {
                    console.log("Error, " + error)
                    this.toast.error("An Error Occurred", {
                        timeout: 10000,
                        position: POSITION.BOTTOM_RIGHT
                    });
                });


            }
            $("#submitSpinner").remove();
            $("#submitData" + this.id).prop("disabled", false);

        }
    }
};


