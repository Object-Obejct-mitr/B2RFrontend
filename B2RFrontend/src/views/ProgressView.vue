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
                                @change="onChange"
                            >
                                <template #item="{ element }">
                                    <div>
                                        <Task :component="element.name" />
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
                                @change="onChange"
                            >
                                <template #item="{ element }">
                                    <div>
                                        <Task :component="element.name" />
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
            todo: {
                Drivetrain: [
                    { name: "Component 0", id: 0 },
                    { name: "Component 1", id: 1 },
                    { name: "Component 2", id: 2 },
                    { name: "Component 3", id: 3 },
                    { name: "Component 4", id: 4 }
                ],
                Electronics: [
                    { name: "Component 0", id: 0 },
                    { name: "Component 1", id: 1 },
                    { name: "Component 2", id: 2 },
                    { name: "Component 3", id: 3 },
                    { name: "Component 4", id: 4 }
                ]
            },
            done: {
                Drivetrain: [
                    { name: "Component 5", id: 5, priority: 0 },
                    { name: "Component 6", id: 6, priority: 1 },
                    { name: "Component 7", id: 7, priority: 2 }
                ],
                Electronics: [
                    { name: "Component 5", id: 5 },
                    { name: "Component 6", id: 6 },
                    { name: "Component 7", id: 7 }
                ]
            },
            tasks: [
                "Drivetrain",
                "Electronics"
            ]
        }

    },
    computed: {

    },
    mounted() {
        console.log("yeah")
    },
    methods: {
        onChange(event) {
            event[0]
            // this is where you can make API calls to update the database
        },
        handleStart(event) {
            console.log(event)
            this.drag == true;
        },
        handleEnd(event) {
            console.log(event)
            this.drag == false;
            // sort the list here
        }
    }

}
</script>
