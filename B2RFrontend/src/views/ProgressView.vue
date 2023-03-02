
<template>
    <main>   
        <div class="d-flex flex-column">
            <div v-for="(taskCategory, name) in tasks" :key="name" class="h-100 d-flex align-items-center mt-5 flex-fill">
                <div class="d-flex justify-content-center flex-column flex-fill">
                    <h1 class="text-center">{{ name }}</h1>
                    <div class="d-flex flex-row flex-fill justify-content-around">  
                        <div v-for="(task, componentName) in taskCategory" :key="task" class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            
                            <h2 class="text-center">{{ componentName }}</h2>
                            <div v-for="taskName in task" :key="taskName" class="sortable-item">
                                <Task :component="value3" />
                            </div>
                            <div class="vr vr-blurry"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
import Task from "@/components/ProgressView/Task.vue"
// import { VueDraggableNext } from "@/vue-draggable-next";
import { defineComponent } from "vue";


export default defineComponent({
    name: "ProgressView",
    components: {
        Task,
        // draggable: VueDraggableNext
    },
    data() {
        return {
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

    }

})



</script>