<template>
    <div>
        <button type="button" class="btn btn-danger btn-sm ms-3" data-mdb-toggle="modal"
            :data-mdb-target="'#delete' + ComponentName" aria-label="Delete Task"><i class="fas fa-trash"></i></button>
        <!-- Modal -->
        <div class="modal fade" :id="'delete' + ComponentName" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h5 class="modal-title text-white" id="exampleModalLabel">Delete Component?</h5>
                        <button type="button" class="btn-close btn-close-white" data-mdb-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Delete The "{{ ComponentName }}" Component?</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="deleteComponent">Confirm Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, getDocs, query, where, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "../../firebase"
import { useToast, POSITION } from "vue-toastification";


export default {
    props: {
        ComponentName: String,
        ComponentID: String,
        TaskData: Object
    },

    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async deleteComponent() { //Please note that this does not clear firestore file uploads

            deleteDoc(doc(db, "ProgressViewTasks/", this.ComponentID)).then(() => {
                this.toast.success("Deleted Component Successfully", {
                    timeout: 2000,
                    position: POSITION.BOTTOM_RIGHT
                })
                $("#delete" + this.ComponentName).modal('hide');
                delete this.taskData[this.ComponentName]

            }).catch(error => {
                console.log("Error, " + error)
                this.toast.error("An Error Occurred", {
                    timeout: 10000,
                    position: POSITION.BOTTOM_RIGHT
                });
            });
            // this.taskData.splice(Object.keys(json).indexOf(this.ComponentName), 1)
        },

    },
    data() {
        return {
            taskData: this.TaskData
        }
    }
}
</script>
  