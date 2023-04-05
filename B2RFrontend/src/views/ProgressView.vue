<template>
    <main>
        <div class="d-flex flex-column align-items-center container-fluid">
            <AddTaskModal />
            <div v-for="(componentData, componentName) in taskData" :key="componentData"
                class="h-100 d-flex align-items-center mt-5 flex-fill w-100">
                <div class="d-flex justify-content-center flex-column flex-fill">
                    <h1 class="text-center">{{ componentName }}</h1>
                    <div class="d-flex flex-row flex-fill justify-content-around">
                        <div class="d-flex flex-column flex-fill me-auto w-50 container-fluid">
                            <h2 class="text-center">To-Do</h2>
                            <hr>
                            <draggable :key="componentData.ToDo" v-model="componentData.ToDo" item-key="name"
                                :group="componentName" @start="handleStart" @end="handleEnd">
                                <template #item="{ element }">
                                    <Task :data="element" :componentName="componentName" />
                                </template>
                            </draggable>
                        </div>
                        <div class="vr vr-blurry"></div>

                        <div class="d-flex flex-column flex-fill me-auto w-50 container-fluid">
                            <h2 class="text-center">Done</h2>
                            <hr>
                            <draggable :key="componentData.Done" v-model="componentData.Done" item-key="name"
                                :group="componentName" @start="handleStart" @end="handleEnd">
                                <template #item="{ element }">
                                    <Task :data="element" :componentName="componentName" />
                                </template>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="js">
import Task from "@/components/ProgressView/Task.vue";
//import TaskData from "../assets/TaskData.json";
import AddTaskModal from "../components/ProgressView/AddTaskModal.vue";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"
import { db, storage } from "../firebase"

import draggable from "vuedraggable"


export default {
    name: "ProgressView",
    components: {
        Task,
        draggable,
        AddTaskModal
    },
    data() {
        return {
            taskData: {},
            drag: false,
        }

    },

    mounted() {
        this.sortEverything()
        this.populateTaskData()
        this.renderTaskData
        // console.log(this.taskData)
    },
    methods: {
        async populateTaskData() {
            let documentCollection = collection(db, "ProgressViewTasks");
            let q = query(documentCollection);
            let querySnapshot = await getDocs(q);
            let categoryId;
            querySnapshot.forEach(async (doc) => {
                // console.log(doc.data())
                console.log("Checking " + doc.data().ComponentName)
                this.taskData[doc.data().ComponentName] = {}
                this.taskData[doc.data().ComponentName]["ToDo"] = []
                this.taskData[doc.data().ComponentName]["Done"] = []
                categoryId = doc.id
                console.log(categoryId)
                documentCollection = collection(db, "ProgressViewTasks/" + categoryId + "/ToDo")
                q = query(documentCollection);
                querySnapshot = await getDocs(q);
                querySnapshot.forEach((subDoc) => {
                    console.log("Found Task " + subDoc.data().Name + " in ToDo of " + doc.data().ComponentName)

                    let Task = {
                        "Name": subDoc.data().Name,
                        "Component": doc.data().ComponentName,
                        "Description": subDoc.data().Description,
                        "Designer": subDoc.data().Designer,
                        "Quantity": +subDoc.data().Quantity, //The + converts it to a number
                        "DesiredQuantity": +subDoc.data().DesiredQuantity,
                        "LeadWorker": subDoc.data().LeadWorker,
                        "Priority": +subDoc.data().Priority,
                        "Photos": subDoc.data().Photos,
                        "CADFiles": subDoc.data().CADFiles,
                        "CatID": doc.id,
                        "Status": "ToDo",
                        "ID": subDoc.id
                    }
                    this.taskData[doc.data().ComponentName]["ToDo"].push(Task)
                })
                documentCollection = collection(db, "ProgressViewTasks/" + categoryId + "/Done")
                q = query(documentCollection);
                querySnapshot = await getDocs(q);
                querySnapshot.forEach((subDoc) => {
                    console.log("Found Task " + subDoc.data().Name + " in Done of " + doc.data().ComponentName)

                    let Task = {
                        "Name": subDoc.data().Name,
                        "Component": doc.data().ComponentName,
                        "Description": subDoc.data().Description,
                        "Designer": subDoc.data().Designer,
                        "Quantity": +subDoc.data().Quantity,
                        "DesiredQuantity": +subDoc.data().DesiredQuantity,
                        "LeadWorker": subDoc.data().LeadWorker,
                        "Priority": +subDoc.data().Priority,
                        "Photos": subDoc.data().Photos,
                        "CADFiles": subDoc.data().CADFiles,
                        "CatID": doc.id,
                        "Status": "Done",
                        "ID": subDoc.id
                    }
                    this.taskData[doc.data().ComponentName]["Done"].push(Task)
                })
            })
            // console.log("Here")
            // console.log(JSON.stringify(this.taskData))

        },
        sortEverything() {
            // for (const taskName of this.tasks) {
            //     this.todo[taskName].sort((a, b) => b.priority - a.priority)
            //     this.done[taskName].sort((a, b) => b.priority - a.priority)
            // }
            console.log("Sorting Not Implemented")
        },
        handleStart() {
            this.drag == true;
        },
        handleEnd(event) {
            console.log(event)
            this.drag == false;
            // sort the list here
            // note: this can a little inefficient considering that
            //        not every tasks' lists have to be sorted,
            //         just the ones that have been modified.
            //       however, I can't find anything in the docs that
            //        lets me see what lists have been modified.
            //       also if a sorted list is sorted again it shouldn't be that bad
            this.sortEverything();

        }
    }

}
</script>
