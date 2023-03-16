<template>
    <main>
        <div class="d-flex flex-column">
            <div
                v-for="(componentData, componentName) in taskData"
                :key="componentData"
                class="h-100 d-flex align-items-center mt-5 flex-fill"
            >
                <div
                    class="d-flex justify-content-center flex-column flex-fill"
                >
                    <h1 class="text-center">{{ componentName }}</h1>
                    <div
                        class="d-flex flex-row flex-fill justify-content-around"
                    >
                        <div
                            class="d-flex flex-column flex-fill ms-5 me-auto w-50"
                        >
                            <h2 class="text-center">To-Do</h2>
                            <draggable
                                :key="componentData.todo"
                                v-model="componentData.todo"
                                item-key="name"
                                :group="componentName"
                                @start="handleStart"
                                @end="handleEnd"
                            >
                                <template #item="{ element }">
                                    <Task :data="element" />
                                </template>
                            </draggable>
                        </div>
                        <div
                            class="d-flex flex-column flex-fill ms-5 me-auto w-50"
                        >
                            <h2 class="text-center">Done</h2>
                            <draggable
                                :key="componentData.done"
                                v-model="componentData.done"
                                item-key="name"
                                :group="componentName"
                                @start="handleStart"
                                @end="handleEnd"
                            >
                                <template #item="{ element }">
                                    <Task :data="element" />
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
import TaskData from "../assets/TaskData.json";
import draggable from "vuedraggable"


export default {
    name: "ProgressView",
    components: {
        Task,
        draggable
    },
    data() {
        return {
            taskData: TaskData,
            drag: false,
        }

    },

    mounted() {
        console.log("progressview page mounted")
        this.sortEverything()
        console.log(this.taskData)
    },
    methods: {
        quantityUpdater(quantityArray) {
            console.log("recieved quantity to be updated")
            console.log(quantityArray[0]) //quantity
            console.log(quantityArray[1]) //id
            console.log(quantityArray[2]) //task name


            this.todo[quantityArray[2]].forEach((task) => {
                console.log(task)
                if (task["id"] == quantityArray[1]) {
                    task["quantity"] = quantityArray[0]
                    return
                }
            });

            this.done[quantityArray[2]].forEach((task) => {
                console.log(task)
                if (task["id"] == quantityArray[1]) {
                    task["quantity"] = quantityArray[0]
                    return
                }
            });
        },
        sortEverything() {
            // for (const taskName of this.tasks) {
            //     this.todo[taskName].sort((a, b) => b.priority - a.priority)
            //     this.done[taskName].sort((a, b) => b.priority - a.priority)
            // }
            console.log("Not Implemented")
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
