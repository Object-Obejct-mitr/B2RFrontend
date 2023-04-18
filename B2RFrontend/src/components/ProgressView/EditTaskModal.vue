
<template>
    <button type="button" class="btn btn-primary" :class="buttonClass" data-mdb-toggle="modal"
        :data-mdb-target="'#taskModal' + id">
        Edit Task
    </button>
    <div :id="'taskModal' + id" class="modal fade nonGrab modal-lg container-fluid" tabindex="-1"
        :aria-labelledby="'modalLabel' + id" data-mdb-backdrop="static" data-mdb-keyboard="false" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form :id="'editTaskForm' + id" @submit.prevent="handleSubmit(id)">
                    <div class="modal-header">
                        <h5 :id="'ModalLabel' + id" class="modal-title">
                            Editing {{ ModifiedState.Name }}
                        </h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="revertState"></button>
                    </div>

                    <div class="modal-body">

                        <div class="d-flex flex-column">
                            <!--Header-->
                            <div class="h3">Task Data</div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Task Name-->

                                <InputText notchWidth="8ch" :id="'taskName' + id" label="Task Name" v-model="ModifiedState.Name"
                                    :isRequired="true" class="mt-3 me-2 w-66" />
                                <!--Component Category-->
                                <!--Couldn't make this its own component, issues with v-model binding, oh well-->
                                <div class="form-outline mt-3 ms-2 w-33">
                                    <i class="fas fa-angle-down trailing"></i>

                                    <select class="form-control active" id="addComponentName" v-model="ModifiedState.Component" required>
                                        <option value="" disabled selected>Select a Component</option>
                                        <option v-for="(option, index) in this.componentList" :value="option" :key="index">
                                            {{ option }}
                                        </option>
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

                                <InputText notchWidth="7ch" id="addTaskDesigner" label="Designer" v-model="ModifiedState.Designer"
                                    :isRequired="true" class="w-33 mt-3 me-2" />

                                <InputText notchWidth="9ch" id="addLeadWorker" label="Lead Worker" v-model="ModifiedState.LeadWorker"
                                    :isRequired="true" class="w-33 mt-3 ms-2" />
                            </div>
                            <!--Priority-->
                            <div class="d-flex flex-row">

                                <InputNumber notchWidth="6ch" id="addTaskPrio" label="Priority" v-model.number="ModifiedState.Priority"
                                    :isRequired="true" class="w-50 mt-3" />
                                <!--Quantity-->
                                <InputNumber notchWidth="6ch" id="addTaskQTY" label="Quantity" v-model.number="ModifiedState.Quantity"
                                    :isRequired="true" class="w-50 mt-3 ms-3" />
                                    
                                <InputNumber notchWidth="12ch" id="desTaskQTY" label="Desired Quantity"
                                    v-model.number="ModifiedState.DesiredQuantity" :isRequired="true" class="w-50 mt-3 ms-3" />
                            </div>
                            <InputTextArea id="addTaskDesc" :numRows="6" v-model="ModifiedState.Description" label="Description"
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
                                            @change="onCADFileSelected" />
                                    </div>
                                    <!--Two renders, one for the currently existing files, and one for new files-->
                                    <div v-for="(file, index) in ModifiedState.NewCADFiles" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ file.name }}
                                        </span>

                                        <i class="fas fa-times" @click="deleteFileFromNew(index)"></i>
                                    </div>
                                    <div v-for="(file, index) in ModifiedState.CADFiles" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ applyRegex(file) }}
                                        </span>

                                        <i class="fas fa-times" @click="deleteFileFromExisting(index)"></i>
                                    </div>
                                </div>

                                <!--Images-->
                                <div class="d-flex flex-column" :class="[isMobile() ? 'w-100' : 'w-50 ms-3']">
                                    <div class="d-flex flex-column mb-3">
                                        <div class="h5">Photos</div>
                                        <label for="addPhotoFile" class="form-label">Upload New
                                            Photos</label>
                                        <input id="addPhotoFile" class="form-control" type="file" accept="image/*" multiple
                                            @change="onPhotoSelected" />
                                    </div>
                                    <div v-for="(file, index) in ModifiedState.NewPhotos" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ file.name }}
                                        </span>
                                        <i class="fas fa-times" @click="deletePhotoFromNew(index)"></i>
                                    </div>   
                                    <div v-for="(file, index) in ModifiedState.Photos" :key="index" class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;"
                                            :style="[isMobile() ? 'width=20ch;' : '']">
                                            {{ applyRegex(file) }}
                                        </span>
                                        <i class="fas fa-times" @click="deletePhotoFromExisting(index)"></i>
                                    </div>        
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer justify-content-between container-fluid flex-row-reverse">
                        <div>
                            <button type="button" class="btn btn-secondary me-3" data-mdb-dismiss="modal" @click="revertState">
                                Cancel
                            </button>
                            <button type="submit" :id="'submitData'+id" class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                        <button type="button" class="btn btn-danger" @click="deleteTask">
                            Delete Task
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

<script src="./EditTaskModalScript.js" />