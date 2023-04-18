<template>
    <div>
        <button type="button" class="btn btn-primary btn-sm ms-3" data-mdb-toggle="modal" data-mdb-target="#addComponent"
            aria-label="Add Task">Add Component</button>
        <!-- Modal -->
        <div class="modal fade" id="addComponent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="addComponent">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Component</h5>
                            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <InputText notchWidth="7ch" id="addComponentName" label="Component Name" v-model="ComponentName"
                                :isRequired="true" class="mt-3" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Component</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, addDoc, query, where, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "../../firebase"
import { useToast, POSITION } from "vue-toastification";
import InputText from "../Misc/InputText.vue";

export default {
    props: {
        TaskData: Object
    },
    setup() {
        const toast = useToast();
        return { toast }
    },
    methods: {
        async addComponent() {
            await addDoc(collection(db, "ProgressViewTasks/"), {
                ComponentName: this.ComponentName,
            }).then(docRef => {
                this.toast.success("Added Component Successfully", {
                    timeout: 2000,
                    position: POSITION.BOTTOM_RIGHT
                });
                $("#addComponent").modal('hide');
                this.taskData[this.ComponentName] = {}
                this.taskData[this.ComponentName]["ToDo"] = []
                this.taskData[this.ComponentName]["Done"] = []
                this.taskData[this.ComponentName]["ID"] = docRef.id
            }).catch(error => {
                console.log("Add document error " + error)
                this.toast.error("Could Not Add Component", {
                    timeout: 10000,
                    position: POSITION.BOTTOM_RIGHT
                });
            });

        },

    },
    data() {
        return {
            taskData: this.TaskData,
            ComponentName: "",

        }
    },
    components: {
        InputText
    }
}
</script>
  