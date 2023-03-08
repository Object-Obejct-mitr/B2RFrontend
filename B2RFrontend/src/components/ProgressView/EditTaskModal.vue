<script>
export default {
    props: {
        id: String,
        component: String,
        priority: Number,
        desc: String
    }
};

</script>


<template>
    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" :data-mdb-target="'#taskModal' + id">Edit
        Task</button>
    <div :id="'taskModal' + id" class="modal fade nonGrab modal-lg" tabindex="-1" :aria-labelledby="'modalLabel' + id"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 :id="'exampleModalLabel' + id" class="modal-title">Editing {{ component }}</h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <form>

                        <div class="d-flex flex-column">
                            <!--Header-->
                            <div class="h3">
                                Basic Data
                            </div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Component Name-->
                                <div class="form-outline mt-3">
                                    <input type="text" :id="'componentName' + id" class="form-control active"
                                        :value="component"><label class="form-label" :for="'componentName' + id">Component
                                        Name</label>
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div class="form-notch-middle" style="width: 13ch;"></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>
                                <!--Priority-->
                                <div class="d-flex flex-row ms-3">
                                    <div class="form-outline w-50 mt-3">
                                        <input type="number" :id="'componentPrio' + id" class="form-control active"
                                            :value="priority"><label class="form-label" :for="'componentPrio' + id">
                                            Priority</label>
                                        <div class="form-notch">
                                            <div class="form-notch-leading"></div>
                                            <div class="form-notch-middle" style="width: 6ch;"></div>
                                            <div class="form-notch-trailing"></div>
                                        </div>
                                    </div>
                                    <!--Quantity-->
                                    <div class="form-outline w-50 mt-3 ms-3">
                                        <input type="number" :id="'componentQTY' + id" class="form-control active"
                                            :value="priority"><label class="form-label" :for="'componentQTY' + id">
                                            Quantity</label>
                                        <div class="form-notch">
                                            <div class="form-notch-leading"></div>
                                            <div class="form-notch-middle" style="width: 6ch;"></div>
                                            <div class="form-notch-trailing"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div class="d-flex flex-row">
                                <!--Designer (No select)-->
                                <div class="form-outline w-33 mt-3 me-2">
                                    <input type="text" :id="'designer' + id" class="form-control active"
                                        :value="component"><label class="form-label" :for="'designer' + id">Designer
                                    </label>
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div class="form-notch-middle" style="width: 7ch;"></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>

                                <!--Lead Worker-->
                                <div class="form-outline w-33 mt-3 ms-2">
                                    <input type="text" :id="'leadWorker' + id" class="form-control active"
                                        :value="component"><label class="form-label" :for="'leadWorker' + id">Lead Worker
                                </label>
                                <div class="form-notch">
                                    <div class="form-notch-leading"></div>
                                    <div class="form-notch-middle" style="width: 9ch;"></div>
                                    <div class="form-notch-trailing"></div>
                                </div>
                            </div>



                            </div>
                            <!--Component Name-->
                            <!--
                                        <div class="form-outline mt-3">
                                            <input type="text" :id="'componentDesc' + id" class="form-control active"
                                                :value="desc"><label class="form-label" :for="'componentDesc' + id">Description</label>
                                            <div class="form-notch">
                                            <div class="form-notch-leading"></div>
                                            <div class="form-notch-middle" style="width: 8ch;"></div>
                                            <div class="form-notch-trailing"></div>
                                        </div>
                                    </div>
                                -->
                        <div class="form-outline mt-3">
                            <textarea class="form-control active" :value="desc" :id="'componentDesc' + id"
                                rows="6"></textarea>
                            <label class="form-label" for="textAreaExample">Description</label>
                            <div class="form-notch">
                                <div class="form-notch-leading"></div>
                                <div class="form-notch-middle" style="width: 7ch;"></div>
                                <div class="form-notch-trailing"></div>
                            </div>
                        </div>

                        <!--Designer-->
                        <!--
                                <div :id="'designer'+id" class="select-wrapper">
                                    <div class="form-outline"><input class="form-control select-input active" type="text"
                                            role="listbox" aria-multiselectable="false" aria-disabled="false"
                                            aria-haspopup="true" aria-expanded="false" readonly="true"><label
                                            class="form-label select-label active">Designer
                                            </label><span class="select-arrow"></span>
                                        <div class="form-notch">
                                                                <div class="form-notch-leading"></div>
                                                                    <div class="form-notch-middle" style="width: 7ch"></div>
                                                                    <div class="form-notch-trailing"></div>
                                            </div>
                                        <div class="form-label select-fake-value">One</div>
                                    </div><select class="select select-initialized">
                                        <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                            <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                -->

                        <!--TODO: Automate this all, get this working nicely-->
                        <!--
                                    <div class="select-dropdown-container" :id="'designerDropdown'+id"
                                    style="position: absolute;"
                                        data-popper-placement="bottom-start">
                                    -->
                        <!--Add "open" to class to add functionality-->
                        <!--
                                        <div tabindex="0" class="select-dropdown">
                                            <div class="select-options-wrapper" style="max-height: 190px;">
                                                <div class="select-options-list">
                                                    <div class="select-option selected active" data-mdb-id="option-720364"
                                                        role="option" aria-selected="true" aria-disabled="false"
                                                        style="height: 38px;"><span class="select-option-text">One</span>
                                                    </div>
                                                    <div class="select-option" data-mdb-id="option-780119" role="option"
                                                        aria-selected="false" aria-disabled="false" style="height: 38px;">
                                                        <span class="select-option-text">Two</span></div>
                                                    <div class="select-option" data-mdb-id="option-450924" role="option"
                                                        aria-selected="false" aria-disabled="false" style="height: 38px;">
                                                                            <span class="select-option-text">Three</span></div>
                                                                            <div class="select-option" data-mdb-id="option-572262" role="option"
                                                                                aria-selected="false" aria-disabled="false" style="height: 38px;">
                                                                                <span class="select-option-text">Four</span></div>
                                                                            <div class="select-option" data-mdb-id="option-928559" role="option"
                                                                                aria-selected="false" aria-disabled="false" style="height: 38px;">
                                                                                <span class="select-option-text">Five</span></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    -->

                            <!--Lead Worker-->
                            <div class="h3 mt-3">
                                Files
                            </div>
                            <hr />
                            <div class="d-flex flex-row">
                                <!--Files-->
                                <div class="d-flex flex-column me-3 w-50">
                                    <div class="h5">CAD/Design</div>
                                    <label :for="'designFile'+id" class="form-label">Upload New CAD/Design Files</label>
                                    <input class="form-control" type="file" :id="'designFile'+id" multiple />
                                </div>
                                <!--Images-->
                                <div class="d-flex flex-column ms-3 w-50">
                                    <div class="d-flex flex-column">
                                        <div class="h5">Photos</div>
                                        <label :for="'photoFile'+id" class="form-label">Upload New Photos</label>
                                        <input class="form-control" type="file" :id="'photoFile'+id" multiple />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-mdb-dismiss="modal">Save changes</button>
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