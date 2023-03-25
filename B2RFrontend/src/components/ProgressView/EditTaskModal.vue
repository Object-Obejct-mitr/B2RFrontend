<script>
import InputNotch from '../Misc/InputNotch.vue';

export default {
    props: {
        id: String,
        data: Object,
        componentName: String,
    },
    components: { InputNotch }
};
</script>

<template>
    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#taskModal' + id">
        Edit Task
    </button>
    <div :id="'taskModal' + id" class="modal fade nonGrab modal-lg" tabindex="-1" :aria-labelledby="'modalLabel' + id"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 :id="'ModalLabel' + id" class="modal-title">
                        Editing {{ data.name }}
                    </h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                <form>
                    <div class="d-flex flex-column">
                        <!--Header-->
                        <div class="h3">Task Data</div>
                        <hr />
                        <div class="d-flex flex-row">
                            <!--Task Name-->
                                <div class="form-outline mt-3 me-2 w-66">
                                    <input :id="'taskName' + id" type="text" class="form-control active"
                                        :value="data.name" /><label class="form-label" :for="'taskName' + id">Task
                                        Name</label>
                                    <InputNotch width="8ch" />
                                </div>
                                <!--Component Category-->
                                <div class="form-outline mt-3 ms-2 w-33">
                                    <i class="fas fa-angle-down trailing"></i>

                                    <select class="form-control active" :id="'componentName' + id">
                                        <option>Drivetrain</option>
                                        <option>Electronics</option>
                                    </select>
                                    <label class="form-label" :for="'componentName' + id">Component Name</label>
                                    <InputNotch width="13ch"/>
                                </div>

                                <!--Priority-->

                            </div>

                            <div class="d-flex flex-row">
                                <div class="form-outline w-33 mt-3 me-2">
                                    <input :id="'designer' + id" type="text" class="form-control active"
                                        :value="data.designer" /><label class="form-label" :for="'designer' + id">Designer
                                    </label>
                                    <InputNotch width="7ch"/>
                                </div>

                                <!--Lead Worker-->
                                <div class="form-outline w-33 mt-3 ms-2">
                                    <input :id="'leadWorker' + id" type="text" class="form-control active"
                                        :value="data.leadWorker" /><label class="form-label" :for="'leadWorker' + id">Lead
                                        Worker
                                    </label>
                                    <InputNotch width="9ch"/>
                                </div>
                            </div>
                            <div class="d-flex flex-row">
                                <div class="form-outline w-50 mt-3">
                                    <input :id="'taskPrio' + id" type="number" class="form-control active"
                                        :value="data.priority" /><label class="form-label" :for="'taskPrio' + id">
                                        Priority</label>
                                        <InputNotch width="6ch"/>
                                </div>
                                <!--Quantity-->
                                <div class="form-outline w-50 mt-3 ms-3">
                                    <input :id="'taskQTY' + id" type="number" class="form-control active"
                                        :value="data.quantity" /><label class="form-label" :for="'taskQTY' + id">
                                        Quantity</label>
                                        <InputNotch width="6ch"/>
                                </div>
                                <div class="form-outline w-50 mt-3 ms-3">
                                    <input :id="'taskQTY' + id" type="number" class="form-control active"
                                        :value="data.desiredQuantity" /><label class="form-label" :for="'taskQTY' + id">
                                        Desired Quantity</label>
                                        <InputNotch width="12ch"/>
                                </div>
                            </div>
                            <div class="form-outline mt-3">
                                <textarea :id="'taskDesc' + id" class="form-control active" :value="data.description"
                                    rows="6"></textarea>
                                <label class="form-label" :for="'taskDesc' + id">Description</label>
                                <InputNotch width="8ch"/>
                            </div>

                            <!--Lead Worker-->
                            <div class="h3 mt-3">Files</div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Files-->
                                <div class="d-flex flex-column me-3 w-50">
                                    <div class="h5">CAD/Design</div>
                                    <label :for="'designFile' + id" class="form-label">Upload New CAD/Design Files</label>
                                    <input :id="'designFile' + id" class="form-control" type="file" multiple />
                                </div>
                                <!--Images-->
                                <div class="d-flex flex-column ms-3 w-50">
                                    <div class="d-flex flex-column">
                                        <div class="h5">Photos</div>
                                        <label :for="'photoFile' + id" class="form-label">Upload New Photos</label>
                                        <input :id="'photoFile' + id" class="form-control" type="file" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary" data-mdb-dismiss="modal">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nonGrab {
    cursor: auto;
}
</style>
