<template>
    <main>
        <div class="d-flex flex-column">
            <div
                v-for="name in tasks"
                :key="name"
                class="h-100 d-flex align-items-center mt-5 flex-fill"
            >
                <div
                    class="d-flex justify-content-center flex-column flex-fill"
                >
                    <h1 class="text-center">{{ name }}</h1>
                    <div
                        class="d-flex flex-row flex-fill justify-content-around"
                    >
                        <div
                            class="d-flex flex-column flex-fill ms-5 me-auto w-50"
                        >
                            <h2 class="text-center">To-Do</h2>
                            <draggable
                                v-model="todo[name]"
                                :group="name"
                                item-key="id"
                                @start="handleStart"
                                @end="handleEnd"
                            >
                                <template #item="{ element }">
                                    <div>
                                        <Task
                                            :component="element.name"
                                            :priority="element.priority"
                                            :desc="lorem"
                                            @quantity-checker="quantityUpdater"
                                        />

                                    </div>
                                </template>
                            </draggable>
                        </div>
                        <div
                            class="d-flex flex-column flex-fill ms-5 me-auto w-50"
                        >
                            <h2 class="text-center">Done</h2>
                            <draggable
                                v-model="done[name]"
                                :group="name"
                                item-key="id"
                                @start="handleStart"
                                @end="handleEnd"
                            >
                                <template #item="{ element }">
                                    <div>
                                        <Task
                                            :component="element.name"
                                            :priority="element.priority"
                                            :desc="lorem"
                                            @quantity-checker="quantityUpdater"
                                        />
                                    </div>
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
import draggable from "vuedraggable"
import { toRaw } from "vue";


export default {
    name: "ProgressView",
    components: {
        Task,
        draggable
    },
    data() {
        return {
            drag: false,
            lorem: "\" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"",
            todo: {
                Drivetrain: [
                    { name: "Component 0", id: 0, priority: 7 },
                    { name: "Component 1", id: 1, priority: 6 },
                    { name: "Component 2", id: 2, priority: 5 },
                    { name: "Component 3", id: 3, priority: 4 },
                    { name: "Component 4", id: 4, priority: 3 }
                ],
                Electronics: [
                    { name: "Component 0", id: 0, priority: 0 },
                    { name: "Component 1", id: 1, priority: 1 },
                    { name: "Component 2", id: 2, priority: 2 },
                    { name: "Component 3", id: 3, priority: 3 },
                    { name: "Component 4", id: 4, priority: 4 }
                ]
            },
            done: {
                Drivetrain: [
                    { name: "Component 5", id: 5, priority: 0 },
                    { name: "Component 6", id: 6, priority: 1 },
                    { name: "Component 7", id: 7, priority: 2 }
                ],
                Electronics: [
                    { name: "Component 5", id: 5, priority: 5 },
                    { name: "Component 6", id: 6, priority: 6 },
                    { name: "Component 7", id: 7, priority: 7 }
                ]
            },
            tasks: [
                "Drivetrain",
                "Electronics"
            ]
        }

    },
    mounted() {
        console.log("progressview page mounted")
        this.sortEverything()
    },
    methods: {
        quantityUpdater(quantityUpdate) {
            console.log("recieved quantity to be updated")
            console.log(quantityUpdate)
            

        },
        sortEverything() {
            for ( const taskName of this.tasks ) {
                this.todo[taskName].sort((a,b) => b.priority - a.priority)
                this.done[taskName].sort((a,b) => b.priority - a.priority)
            }
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
