<!-- eslint-disable vue/multi-word-component-names -->
<!-- TODO: Get unique IDs per element-->
<script>
import EditTaskModal from "./EditTaskModal.vue";
let uuid = 0;

export default {
    components: {
        EditTaskModal,
    },
    props: {
        data: Object,
        componentName: String,
        // component: {
        //     type: String,
        //     default: "None",
        //     required: true,
        // },
        // priority: {
        //     type: Number,
        //     default: 0,
        //     required: true,
        // },
        // desc: {
        //     type: String,
        //     default: "No description provided.",
        //     required: true,
        // },
        // elemId: {
        //     type: Number,
        //     default: 0,
        //     required: true,
        // },
        // quantity: {
        //     type: Number,
        //     default: 0,
        //     required: true,
        // },
        // parentName: {
        //     type: String,
        //     default: "None",
        //     required: true,
        // },
    },
    emits: ["quantityChecker"],
    data() {
        return {
            localQuantity: this.quantity,
        };
    },
    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
    methods: {
        quantityChecker(quantityUpdate) {
            this.$emit("quantityChecker", [
                quantityUpdate,
                this.elemId,
                this.parentName,
            ]);
        },
    },
};
</script>

<template>
    <div id="accordionPanelsStayOpen" class="accordion accordion-flush grab">
        <div class="accordion-item">
            <div
                :id="'flush-heading' + uuid"
                class="accordion-header d-flex justify-content-between align-items-center"
            >
                <div class="d-flex flex-row text-wrap" style="width: 30ch">
                    <div
                        class="d-flex align-self-center fs-4"
                        style="user-select: text"
                    >
                        {{ data.name }}
                    </div>
                </div>
                <div class="d-flex flex-row" style="width: 20ch">
                    <div class="d-flex align-self-center">QTY:</div>
                    <input
                        v-model="localQuantity"
                        class="ms-2 form-control number"
                        type="number"
                        @input="quantityChecker(localQuantity)"
                    />
                    <div class="d-flex align-self-center ms-2">/</div>
                    <div class="d-flex align-self-center ms-2">
                        {{ data.desiredQuantity }}
                    </div>
                </div>

                <div class="d-flex flex-row" style="width: 30ch">
                    <div class="d-flex align-self-center text-wrap">
                        Worker:
                    </div>
                    <div class="d-flex align-self-center ms-2">
                        {{ data.leadWorker }}
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex align-self-center">Priority:</div>
                    <div class="d-flex align-self-center ms-2">
                        {{ data.priority }}
                    </div>
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
                    <div
                        class="d-flex flex-column flex-fill w-25 justify-content-between"
                    >
                        <div>
                            {{ data.description }}
                            <div class="d-flex flex-row mt-2 ms-2 h5">
                                <div class="d-flex align-self-center">
                                    Designer:
                                </div>
                                <div class="d-flex align-self-center ms-2">
                                    {{ data.designer }}
                                </div>
                            </div>
                        </div>
                        <div class="mt-2">
                            <EditTaskModal
                                :id="uuid"
                                :componentName="componentName"
                                :data="data"
                            />
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
    user-select: none;
}

.grab:active {
    cursor: grabbing;
}
</style>
