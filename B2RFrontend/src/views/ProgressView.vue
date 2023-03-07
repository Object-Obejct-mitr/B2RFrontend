
<template>
    <main>   
        <div :key="drag" class="d-flex flex-column" >
            
            <div v-for="(taskContent, name) in tasks" :key="taskContent" class="h-100 d-flex align-items-center mt-5 flex-fill">
                <div class="d-flex justify-content-center flex-column flex-fill">
                    <h1 class="text-center">{{ name }}</h1>
                    <div class="d-flex flex-row flex-fill justify-content-around">  
                        <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            <h2 class="text-center">To-Do</h2>
                            <draggable 
                                v-model="tasks[name]['To-Do']"
                                :group="name"
                                @change="onChange" >
                                <Task v-for="taskName in tasks[name]['To-Do']" :key="taskName" :component="taskName"/>
                            </draggable>
                        </div>
                        <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            <h2 class="text-center">Done</h2>
                            <draggable 
                                v-model="tasks[name]['Done']"
                                :group="name"
                                @change="onChange" >
                                <Task v-for="taskName in tasks[name]['Done']" :key="taskName" :component="taskName"/>
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
import { VueDraggableNext } from "vue-draggable-next";
import { defineComponent } from "vue";


export default defineComponent({
    name: "ProgressView",
    components: {
        Task,
        draggable: VueDraggableNext
    },
    data() {
        return {
            drag: false,
            tasks: {
                Drivetrain: {
                    "To-Do": [
                        "Component 0",
                        "Component 1",
                        "Component 2",
                        "Component 3",
                        "Component 4"
                    ],
                    "Done": [
                        "Component 5",
                        "Component 6",
                        "Component 7"
                    ]
                },
                Electronics: {
                    "To-Do": [
                        "Component 0",
                        "Component 1",
                        "Component 2",
                        "Component 3",
                        "Component 4"
                    ],
                    "Done": [
                        "Component 5",
                        "Component 6",
                        "Component 7"
                    ]
                }
            }
        }

    },
    methods: {
        onChange(event) {
            console.log(event)
            console.log(this.tasks)
            // this.drag = !this.drag
        }
    }

})



</script>