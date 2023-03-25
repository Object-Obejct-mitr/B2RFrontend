
<template>
    <button type="button" class="btn btn-primary w-25 mt-3" data-mdb-toggle="modal" data-mdb-target="#addTaskModal">
        Add Task
    </button>
    <div id="addTaskModal" class="modal fade nonGrab modal-lg container-fluid" tabindex="-1" aria-labelledby="addModalLabel"
        data-mdb-backdrop="static" data-mdb-keyboard="false" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="addTaskForm" @submit.prevent="handleSubmit">
                    <div class="modal-header">
                        <h5 id="addModalLabel" class="modal-title">
                            Add New Task
                        </h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">

                        <div class="d-flex flex-column">
                            <!--Header-->
                            <div class="h3">Task Data</div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Task Name-->
                                <div class="form-outline mt-3 me-2 w-66">
                                    <input id="addTaskName" type="text" class="form-control" v-model="Name" required />
                                    <label class="form-label" for="addTaskName">Task Name</label>
                                    <InputNotch width="8ch" />
                                </div>
                                <!--Component Category-->
                                <div class="form-outline mt-3 ms-2 w-33">
                                    <i class="fas fa-angle-down trailing"></i>

                                    <select class="form-control active" id="addComponentName" v-model="Component" required>
                                        <option value="" disabled selected>Select a Component</option>
                                        <option value="Drivetrain">Drivetrain</option>
                                        <option value="Electronics">Electronics</option>
                                    </select>
                                    <label class="form-label" for="addComponentName">Component Name</label>
                                    <InputNotch width="13ch" />
                                </div>

                            </div>

                            <div class="d-flex flex-row">
                                <div class="form-outline w-33 mt-3 me-2">
                                    <input id="addTaskDesigner" type="text" class="form-control" v-model="Designer"
                                        required />
                                    <label class="form-label" for="addTaskDesigner">Designer</label>
                                    <InputNotch width="7ch" />
                                </div>

                                <!--Lead Worker-->
                                <div class="form-outline w-33 mt-3 ms-2">
                                    <input id="addLeadWorker" type="text" class="form-control" v-model="LeadWorker"
                                        required />
                                    <label class="form-label" for="addLeadWorker">Lead Worker</label>
                                    <InputNotch width="9ch" />
                                </div>
                            </div>
                            <!--Priority-->
                            <div class="d-flex flex-row">
                                <div class="form-outline w-50 mt-3">
                                    <input id="addTaskPrio" type="number" class="form-control" v-model="Priority"
                                        required />
                                    <label class="form-label" for="addTaskPrio">Priority</label>
                                    <InputNotch width="6ch" />
                                </div>
                                <!--Quantity-->
                                <div class="form-outline w-50 mt-3 ms-3">
                                    <input id="addTaskQTY" type="number" class="form-control" v-model="Quantity" required />
                                    <label class="form-label" for="addTaskQTY">Quantity</label>
                                    <InputNotch width="6ch" />
                                </div>
                                <div class="form-outline w-50 mt-3 ms-3">
                                    <input id="addTaskQTY" type="number" class="form-control" v-model="DesiredQuantity"
                                        required />
                                    <label class="form-label" for="addTaskQTY">Desired Quantity</label>
                                    <InputNotch width="12ch" />
                                </div>
                            </div>
                            <div class="form-outline mt-3">
                                <textarea id="addTaskDesc" class="form-control" rows="6" v-model="Description"></textarea>
                                <label class="form-label" for="addTaskDesc">Description</label>
                                <InputNotch width="8ch" />
                            </div>

                            <!--Lead Worker-->
                            <div class="h3 mt-3">Files</div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Files-->
                                <div class="d-flex flex-column me-3 w-50">
                                    <div class="h5">CAD/Design</div>
                                    <label for="addDesignFile" class="form-label">Upload New
                                        CAD/Design Files</label>
                                    <input id="addDesignFile" class="form-control" type="file" multiple
                                        @change="onCadFileSelected" />

                                </div>
                                <!--Images-->
                                <div class="d-flex flex-column ms-3 w-50">
                                    <div class="d-flex flex-column">
                                        <div class="h5">Photos</div>
                                        <label for="addPhotoFile" class="form-label">Upload New
                                            Photos</label>
                                        <input id="addPhotoFile" class="form-control" type="file" multiple
                                            @change="onPhotoSelected" />
                                    </div>
                                    <div v-for="(file, index) in Photos" :key="index">
                                        <p>{{ file.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                            Cancel
                        </button>
                        <button type="submit" id="submitData" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nonGrab {
    cursor: auto;
}
</style>

<script src="./AddTaskModalScript.js" />