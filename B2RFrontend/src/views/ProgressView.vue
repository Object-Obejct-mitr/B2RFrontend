
<template>
    <main>
        <div class="d-flex flex-column">

            <div v-for="(name, index) in tasks" :key="name + index" class="h-100 d-flex align-items-center mt-5 flex-fill">
                <div class="d-flex justify-content-center flex-column flex-fill">
                    <h1 class="text-center">{{ name }}</h1>
                    <div class="d-flex flex-row flex-fill justify-content-around">
                        <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            <h2 class="text-center">To-Do</h2>
                            <draggable v-model="todo[name]" :group="name" :item-key="index" @start="drag = true"
                                @end="drag = false" @change="onChange">
                                <template #item="{ element }">
                                    <div>
                                        <Task :component="element.name" :priority="element.priority" :desc="lorem" @quantity-checker="quantityUpdater"/>
                                    </div>
                                </template>
                            </draggable>
                        </div>
                        <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            <h2 class="text-center">Done</h2>
                            <draggable v-model="done[name]" :group="name" :item-key="index" @start="drag = true"
                                @end="drag = false" @change="onChange">
                                <template #item="{ element }">
                                    <div>
                                        <Task :component="element.name" :priority="element.priority" :desc="lorem" @quantity-checker="quantityUpdater"/>
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
import { toRaw } from "vue";
import draggable from 'vuedraggable'


export default {
    name: "ProgressView",
    components: {
        Task,
        draggable
    },
    data() {
        return {
            test: 0,
            drag: false,
            lorem: "\" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"",
            todo: {
                Drivetrain: [
                    { name: "Component 0", priority: 0 },
                    { name: "Component 1", priority: 1 },
                    { name: "Component 2", priority: 2 },
                    { name: "Component 3", priority: 3 },
                    { name: "Component 4", priority: 4 }
                ],
                Electronics: [
                    { name: "Component 0", priority: 0 },
                    { name: "Component 1", priority: 1 },
                    { name: "Component 2", priority: 2 },
                    { name: "Component 3", priority: 3 },
                    { name: "Component 4", priority: 4 }
                ]
            },
            done: {
                Drivetrain: [
                    { name: "Component 5", priority: 1 },
                    { name: "Component 6", priority: 2 },
                    { name: "Component 7", priority: 4 }
                ],
                Electronics: [
                    { name: "Component 5", priority: 2 },
                    { name: "Component 6", priority: 3 },
                    { name: "Component 7", priority: 1 }
                ]
            },
            tasks: [
                "Drivetrain",
                "Electronics"
            ]
        }

    },
    mounted() {
        console.log("yeah")
    },
    methods: {
        onChange(event) {
            event[0]
            // this is where you can make API calls to update the database
        },
        quantityUpdater(quantityUpdate) {
            
        }
    }

}



</script>
