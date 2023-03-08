<!-- TODO: Get unique IDs per element-->
<script>
import EditTaskModal from "./EditTaskModal.vue";
let uuid = 0;

export default {
    props: {
        component: String,
        priority: Number,
        desc: String
    },
    components: {
        EditTaskModal
    },
    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
};
</script>


<template >
    
    <div id="accordionPanelsStayOpen" class="accordion accordion-flush grab">
        <div class="accordion-item">
            <div
                :id="'flush-heading' + uuid"
                class="accordion-header d-flex justify-content-between align-items-center"
            >
                <div class="d-flex flex-row">
                    <div class="d-flex align-self-center fs-4">
                        {{ component }}
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex align-self-center">QTY:</div>
                    <input
                        class="ms-2 form-control number"
                        value="3"
                        type="number"
                    />
                    <div class="d-flex align-self-center ms-2">/</div>
                    <div class="d-flex align-self-center ms-2">10</div>
                </div>
                <!-- <div class="d-flex flex-row">
                    <div class="d-flex align-self-center">Designer:</div>
                    <div class="d-flex align-self-center ms-2">None</div>
                </div> -->
                <div class="d-flex flex-row">
                    <div class="d-flex align-self-center">Worker:</div>
                    <div class="d-flex align-self-center ms-2">None</div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex align-self-center">Priority:</div>
                    <div class="d-flex align-self-center ms-2">{{ priority }}</div>
                </div>

                <button
                    class="accordion-button collapsed noWidth"
                    type="button"
                    data-mdb-toggle="collapse"
                    :data-mdb-target="'#panelsStayOpen-collapse' + uuid"
                    aria-expanded="false"
                    :aria-controls="'panelsStayOpen-collapseOne' + uuid"
                ></button>
            </div>
            <div
                :id="'panelsStayOpen-collapse' + uuid"
                class="accordion-collapse collapse"
                :aria-labelledby="'heading' + uuid"
            >
                <div
                    class="accordion-body d-flex flex-row justify-content-around"
                >
                    <div class="d-flex flex-column flex-fill w-25">
                        <div>
                            {{desc}}
                        </div>
                        <div class="mt-2">
              
                            <EditTaskModal :component="component" :id="uuid" :priority="priority" :desc="desc"/>
                        </div>
                    </div>

                    <div
                        class="d-flex flex-column align-items-center flex-fill"
                    >
                        <img src="https://via.placeholder.com/150" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.noWidth {
    width: auto !important;
}

.number {
    max-width: 75px;
    height: 1lh;
}

p {
    height: 100%;
}

.grab {
    cursor: grab;
}

.grab:active {
    cursor:grabbing;
}
</style>
