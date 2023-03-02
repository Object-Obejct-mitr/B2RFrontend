
<template>
    <main>   
        <div class="d-flex flex-column">
            <div v-for="(taskCategory, name) in tasks" :key="name" class="h-100 d-flex align-items-center mt-5 flex-fill">
                <div class="d-flex justify-content-center flex-column flex-fill">
                    <h1 class="text-center">{{ name }}</h1>
                    <div class="d-flex flex-row flex-fill justify-content-around">  
                        <div v-for="(task, componentName) in taskCategory" :key="task" class="d-flex flex-column flex-fill ms-5 me-auto w-50">
                            
                            <h2 class="text-center">{{ componentName }}</h2>
                            <draggable
                                :list="task"
                                group="componentName"
                                item-key="id"
                                @start="drag=true" 
                                @end="drag=false" >
                                <template #item="{ element }">
                                    <Task :component="element" />
                                </template>
                            </draggable>

                            <div class="vr vr-blurry"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
import Task from "@/components/ProgressView/Task.vue";
import draggable from 'vuedraggable';

export default {
    name: "ProgressView",
    components: {
        Task,
        draggable
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

    }

}



</script>