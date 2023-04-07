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
                            <!-- {{  taskData[componentName]['ToDo'] }} -->
                            <draggable v-model="taskData[componentName]['ToDo']" :group="componentName" @start="drag = true"
                                @end="orderList(componentName, 'ToDo')" item-key="id"
                                @change="updateCategory($event, 'ToDo').then(()=>orderList(componentName, 'ToDo'))" :sort="true">
                                <template #item="{ element }">
                                    <Task :data="element" :componentName="componentName" />
                                </template>
                            </draggable>
                        </div>
                        <div class="vr vr-blurry"></div>

                        <div class="d-flex flex-column flex-fill me-auto w-50 container-fluid">
                            <h2 class="text-center">Done</h2>
                            <hr>
                            <draggable v-model="taskData[componentName]['Done']" :group="componentName" @start="drag = true"
                                @end="orderList(componentName, 'Done')" item-key="id"
                                @change="updateCategory($event, 'Done').then(()=>orderList(componentName, 'Done'))" :sort="true">
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
import { collection, getDocs, query, where, addDoc, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore"
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
        this.populateTaskData()
    },
    methods: {
        async updateCategory(event, newStatus) {
            this.drag = false;
            if (event.added != undefined) {
                console.log(event);
                console.log(newStatus);
                let task = event.added.element;
                if (event.added.element.Status != newStatus) {
                    await setDoc(doc(db, "ProgressViewTasks/" + task.CatID + "/" + newStatus, task.ID), {
                        Name: task.Name,
                        Description: task.Description,
                        Designer: task.Designer,
                        DesiredQuantity: task.DesiredQuantity,
                        LeadWorker: task.LeadWorker,
                        Priority: task.Priority,
                        Quantity: task.Quantity,
                        Photos: task.Photos,
                        CADFiles: task.CADFiles,
                        id: task.ID,
                        Status: newStatus,
                        Hidden: task.Hidden
                    }).then(() => {
                        console.log("Added to " + newStatus + ", deleting old:");
                        deleteDoc(doc(db, "ProgressViewTasks/" + task.CatID + "/" + event.added.element.Status, task.ID))
                        .then(() => {
                            console.log("Move Complete");
                        }).catch(error => {
                            console.log("Error during delete, " + error)

                        });
                    })
                }
            }

            },
            orderList(componentName, category) {
                this.taskData[componentName][category] = this.taskData[componentName][category].sort((one, two) => {
                    return one.Priority - two.Priority;
                });
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
                        "Component": componentName,
                        "Description": subDoc.data().Description,
                        "Designer": subDoc.data().Designer,
                        "Quantity": +subDoc.data().Quantity, //The + converts it to a number
                        "DesiredQuantity": +subDoc.data().DesiredQuantity,
                        "LeadWorker": subDoc.data().LeadWorker,
                        "Priority": +subDoc.data().Priority,
                        "Photos": subDoc.data().Photos,
                        "CADFiles": subDoc.data().CADFiles,
                        "CatID": categoryId,
                        "Status": status,
                        "ID": subDoc.id,
                        "Hidden": subDoc.data().Hidden
                    }
                    this.taskData[componentName][status].push(Task)
                })
            },
        async populateTaskData() {
                let documentCollection = collection(db, "ProgressViewTasks");
                let q = query(documentCollection);
                let querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.taskData[doc.data().ComponentName] = {}
                    this.taskData[doc.data().ComponentName]["ToDo"] = []
                    this.taskData[doc.data().ComponentName]["Done"] = []
                    console.log(doc.id);
                    this.fetchTasks(doc.id, doc.data().ComponentName, "Done").then(() => {
                        this.fetchTasks(doc.id, doc.data().ComponentName, "ToDo");
                    });
                })


            },
        }

    }
</script>
