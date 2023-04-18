<template>
    <div class="d-flex flex-column mt-5">
        <h2>Components</h2>
        <ul class="list-group list-group-light ms-3 w-25 mt-3">

            <li v-for="(componentData, componentName) in this.taskData" :key="componentName"
                class="list-group-item d-flex justify-content-between align-items-center">

                {{ componentName }}
                <div class="d-flex flex-row">
                    <div>
                    <span class="badge badge-primary rounded-pill">{{ this.taskData[componentName]['ToDo'].length + ' ToDo'
                    }}</span>
                    </div>
                    /
                    <div>
                    <span class="badge badge-primary rounded-pill">{{ this.taskData[componentName]['Done'].length + ' Done'
                    }}</span>
                    </div>
                    
                    <DeleteModal :ComponentName="componentName" :ComponentID="this.taskData[componentName]['ID']" :TaskData="taskData"/>
                </div>
            </li>

        </ul>
        <div class="d-flex flex-row">
            <AddModal :TaskData="this.taskData"/>
        </div>
    </div>
</template>

<script lang="js">
import { collection, getDocs, query, where, addDoc, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore"
import { db, storage } from "../../firebase"
import DeleteModal from "./DeleteModal.vue"
import AddModal from "./AddModal.vue"
export default {
    mounted() {
        this.populateTaskData()
    },
    methods: {
        async populateTaskData() {
            let documentCollection = collection(db, "ProgressViewTasks");
            let q = query(documentCollection);
            let querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.taskData[doc.data().ComponentName] = {}
                this.taskData[doc.data().ComponentName]["ToDo"] = []
                this.taskData[doc.data().ComponentName]["Done"] = []
                this.taskData[doc.data().ComponentName]["ID"] = doc.id
                this.fetchTasks(doc.id, doc.data().ComponentName, "Done").then(() => {
                    this.fetchTasks(doc.id, doc.data().ComponentName, "ToDo");
                });
            })
        },
        async fetchTasks(categoryId, componentName, status) {
            let documentCollection = collection(db, "ProgressViewTasks/" + categoryId + "/" + status)
            let q = query(documentCollection, orderBy("Priority", "desc"));
            let querySnapshot = await getDocs(q);
            querySnapshot.forEach((subDoc) => {
                console.log("Found Task " + subDoc.data().Name + " in " + status + " of " + componentName)
                console.log("Path: " + "ProgressViewTasks/" + categoryId + "/" + status)
                let Task = {
                    "Name": subDoc.data().Name,
                }
                this.taskData[componentName][status].push(Task)
            })
        },
    },
    components: {
        DeleteModal,
        AddModal
    },
    data() {
        return {
            taskData: {}
        }
    }

}
</script>
