
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

                                <InputText notchWidth="8ch" id="addTaskName" label="Task Name" v-model="Name"
                                    :isRequired="true" class="mt-3 me-2 w-66" />
                                <!--Component Category-->
                                <!--Couldn't make this its own component, issues with v-model binding, oh well-->
                                <div class="form-outline mt-3 ms-2 w-33">
                                    <i class="fas fa-angle-down trailing"></i>

                                    <select class="form-control active" id="addComponentName" v-model="Component" required>
                                        <option value="" disabled selected>Select a Component</option>
                                        <option value="Drivetrain">Drivetrain</option>
                                        <option value="Electronics">Electronics</option>
                                    </select>
                                    <label class="form-label" for="addComponentName">Component Name</label>
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div style="width: 13ch" class="form-notch-middle"></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>

                            </div>

                            <div class="d-flex flex-row">

                                <InputText notchWidth="7ch" id="addTaskDesigner" label="Designer" v-model="Designer"
                                    :isRequired="true" class="w-33 mt-3 me-2" />

                                <InputText notchWidth="9ch" id="addLeadWorker" label="Lead Worker" v-model="LeadWorker"
                                    :isRequired="true" class="w-33 mt-3 ms-2" />
                            </div>
                            <!--Priority-->
                            <div class="d-flex flex-row">

                                <InputNumber notchWidth="6ch" id="addTaskPrio" label="Priority" v-model="Priority"
                                    :isRequired="true" class="w-50 mt-3" />
                                <!--Quantity-->
                                <InputNumber notchWidth="6ch" id="addTaskQTY" label="Quantity" v-model="Quantity"
                                    :isRequired="true" class="w-50 mt-3 ms-3" />
                                <InputNumber notchWidth="12ch" id="desTaskQTY" label="Desired Quantity"
                                    v-model="DesiredQuantity" :isRequired="true" class="w-50 mt-3 ms-3" />
                            </div>
                            <InputTextArea id="addTaskDesc" numRows="6" v-model="Description" label="Description"
                                notchWidth="8ch" class="mt-3" />

                            <!--Lead Worker-->
                            <div class="h3 mt-3">Files</div>
                            <hr />
                            <div class="d-flex" :class="[isMobile() ? 'flex-column' : 'flex-row']">
                                <!--Files-->
                                <div class="d-flex flex-column me-3 mb-3" :class="[isMobile() ? 'w-100' : 'w-50']">
                                    <div class="d-flex flex-column mb-3">

                                        <div class="h5">CAD/Design</div>
                                        <label for="addDesignFile" class="form-label">Upload New
                                            CAD/Design Files</label>
                                        <input id="addDesignFile" class="form-control" type="file" multiple
                                            @change="onCadFileSelected" />
                                    </div>
                                    <div v-for="(file, index) in CADFiles" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ file.name }}
                                        </span>

                                        <i class="fas fa-times" @click="deleteFile(index)"></i>
                                    </div>
                                </div>

                                <!--Images-->
                                <div class="d-flex flex-column" :class="[isMobile() ? 'w-100' : 'w-50 ms-3']">
                                    <div class="d-flex flex-column mb-3">
                                        <div class="h5">Photos</div>
                                        <label for="addPhotoFile" class="form-label">Upload New
                                            Photos</label>
                                        <input id="addPhotoFile" class="form-control" type="file" multiple
                                            @change="onPhotoSelected" />
                                    </div>
                                    <div v-for="(file, index) in Photos" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ file.name }}
                                        </span>
                                        <i class="fas fa-times" @click="deletePhoto(index)"></i>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal" @click="resetFiles">
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