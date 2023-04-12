<template>
    <button
        type="button"
        class="btn btn-primary"
        :class="buttonClass"
        data-mdb-toggle="modal"
        :data-mdb-target="'#taskModal' + id"
    >
        Edit Task
    </button>
    <div
        :id="'taskModal' + id"
        class="modal fade nonGrab modal-lg container-fluid"
        tabindex="-1"
        :aria-labelledby="'modalLabel' + id"
        data-mdb-backdrop="static"
        data-mdb-keyboard="false"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <form
                    :id="'editTaskForm' + id"
                    @submit.prevent="handleSubmit(id)"
                >
                    <div class="modal-header">
                        <h5 :id="'ModalLabel' + id" class="modal-title">
                            Editing {{ ModifiedState.Name }}
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                            @click="revertState"
                        ></button>
                    </div>

                    <div class="modal-body">
                        <div class="d-flex flex-column">
                            <!--Header-->
                            <div class="h3">Task Data</div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Task Name-->

                                <InputText
                                    :id="'taskName' + id"
                                    v-model="ModifiedState.Name"
                                    notch-width="8ch"
                                    label="Task Name"
                                    :is-required="true"
                                    class="mt-3 me-2 w-66"
                                />
                                <!--Component Category-->
                                <!--Couldn't make this its own component, issues with v-model binding, oh well-->
                                <div class="form-outline mt-3 ms-2 w-33">
                                    <i class="fas fa-angle-down trailing"></i>

                                    <select
                                        id="addComponentName"
                                        v-model="ModifiedState.Component"
                                        class="form-control active"
                                        required
                                    >
                                        <option value="" disabled selected>
                                            Select a Component
                                        </option>
                                        <option value="Drivetrain">
                                            Drivetrain
                                        </option>
                                        <option value="Electronics">
                                            Electronics
                                        </option>
                                    </select>
                                    <label
                                        class="form-label"
                                        for="addComponentName"
                                    >Component Name</label
                                    >
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div
                                            style="width: 13ch"
                                            class="form-notch-middle"
                                        ></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-row">
                                <InputText
                                    id="addTaskDesigner"
                                    v-model="ModifiedState.Designer"
                                    notch-width="7ch"
                                    label="Designer"
                                    :is-required="true"
                                    class="w-33 mt-3 me-2"
                                />

                                <InputText
                                    id="addLeadWorker"
                                    v-model="ModifiedState.LeadWorker"
                                    notch-width="9ch"
                                    label="Lead Worker"
                                    :is-required="true"
                                    class="w-33 mt-3 ms-2"
                                />
                            </div>
                            <!--Priority-->
                            <div class="d-flex flex-row">
                                <InputNumber
                                    id="addTaskPrio"
                                    v-model.number="ModifiedState.Priority"
                                    notch-width="6ch"
                                    label="Priority"
                                    :is-required="true"
                                    class="w-50 mt-3"
                                />
                                <!--Quantity-->
                                <InputNumber
                                    id="addTaskQTY"
                                    v-model.number="ModifiedState.Quantity"
                                    notch-width="6ch"
                                    label="Quantity"
                                    :is-required="true"
                                    class="w-50 mt-3 ms-3"
                                />

                                <InputNumber
                                    id="desTaskQTY"
                                    v-model.number="
                                        ModifiedState.DesiredQuantity
                                    "
                                    notch-width="12ch"
                                    label="Desired Quantity"
                                    :is-required="true"
                                    class="w-50 mt-3 ms-3"
                                />
                            </div>
                            <InputTextArea
                                id="addTaskDesc"
                                v-model="ModifiedState.Description"
                                :num-rows="6"
                                label="Description"
                                notch-width="8ch"
                                class="mt-3"
                            />

                            <!--Lead Worker-->
                            <div class="h3 mt-3">Files</div>
                            <hr />
                            <div
                                class="d-flex"
                                :class="[
                                    isMobile() ? 'flex-column' : 'flex-row',
                                ]"
                            >
                                <!--Files-->
                                <div
                                    class="d-flex flex-column me-3 mb-3"
                                    :class="[isMobile() ? 'w-100' : 'w-50']"
                                >
                                    <div class="d-flex flex-column mb-3">
                                        <div class="h5">CAD/Design</div>
                                        <label
                                            for="addDesignFile"
                                            class="form-label"
                                        >Upload New CAD/Design Files</label
                                        >
                                        <input
                                            id="addDesignFile"
                                            class="form-control"
                                            type="file"
                                            multiple
                                            @change="onCADFileSelected"
                                        />
                                    </div>
                                    <!--Two renders, one for the currently existing files, and one for new files-->
                                    <div
                                        v-for="(
                                            file, index
                                        ) in ModifiedState.NewCADFiles"
                                        :key="index"
                                        class="d-flex flex-row w-100 pe-3"
                                    >
                                        <span
                                            class="me-auto"
                                            style="
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            "
                                            :style="[
                                                isMobile() ? 'width=20ch;' : '',
                                            ]"
                                        >
                                            {{ file.name }}
                                        </span>

                                        <i
                                            class="fas fa-times"
                                            @click="deleteFileFromNew(index)"
                                        ></i>
                                    </div>
                                    <div
                                        v-for="(
                                            file, index
                                        ) in ModifiedState.CADFiles"
                                        :key="index"
                                        class="d-flex flex-row w-100 pe-3"
                                    >
                                        <span
                                            class="me-auto"
                                            style="
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            "
                                            :style="[
                                                isMobile() ? 'width=20ch;' : '',
                                            ]"
                                        >
                                            {{ applyRegex(file) }}
                                        </span>

                                        <i
                                            class="fas fa-times"
                                            @click="
                                                deleteFileFromExisting(index)
                                            "
                                        ></i>
                                    </div>
                                </div>

                                <!--Images-->
                                <div
                                    class="d-flex flex-column"
                                    :class="[
                                        isMobile() ? 'w-100' : 'w-50 ms-3',
                                    ]"
                                >
                                    <div class="d-flex flex-column mb-3">
                                        <div class="h5">Photos</div>
                                        <label
                                            for="addPhotoFile"
                                            class="form-label"
                                        >Upload New Photos</label
                                        >
                                        <input
                                            id="addPhotoFile"
                                            class="form-control"
                                            type="file"
                                            multiple
                                            @change="onPhotoSelected"
                                        />
                                    </div>
                                    <div
                                        v-for="(
                                            file, index
                                        ) in ModifiedState.NewPhotos"
                                        :key="index"
                                        class="d-flex flex-row w-100 pe-3"
                                    >
                                        <span
                                            class="me-auto"
                                            style="
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            "
                                            :style="[
                                                isMobile() ? 'width=20ch;' : '',
                                            ]"
                                        >
                                            {{ file.name }}
                                        </span>
                                        <i
                                            class="fas fa-times"
                                            @click="deletePhotoFromNew(index)"
                                        ></i>
                                    </div>
                                    <div
                                        v-for="(
                                            file, index
                                        ) in ModifiedState.Photos"
                                        :key="index"
                                        class="d-flex flex-row w-100 pe-3"
                                    >
                                        <span
                                            class="me-auto"
                                            style="
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            "
                                            :style="[
                                                isMobile() ? 'width=20ch;' : '',
                                            ]"
                                        >
                                            {{ applyRegex(file) }}
                                        </span>
                                        <i
                                            class="fas fa-times"
                                            @click="
                                                deletePhotoFromExisting(index)
                                            "
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="modal-footer justify-content-between container-fluid flex-row-reverse"
                    >
                        <div>
                            <button
                                type="button"
                                class="btn btn-secondary me-3"
                                data-mdb-dismiss="modal"
                                @click="revertState"
                            >
                                Cancel
                            </button>
                            <button
                                :id="'submitData' + id"
                                type="submit"
                                class="btn btn-primary"
                            >
                                Save changes
                            </button>
                        </div>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="deleteTask"
                        >
                            Delete Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script src="./EditTaskModalScript.js" />

<style scoped>
.nonGrab {
    cursor: auto;
}
</style>
