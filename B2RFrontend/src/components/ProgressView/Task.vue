<!-- eslint-disable vue/multi-word-component-names -->
<!-- TODO: Get unique IDs per element-->
<script>
import EditTaskModal from "./EditTaskModal.vue";
import { ref } from 'vue';
import debounce from 'lodash/debounce';
import { db } from "../../firebase"
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore"
import Lightbox from "../Misc/Lightbox.vue"


let uuid = 0;



export default {
    components: {
        EditTaskModal,
        Lightbox
    },

    props: {
        data: Object,
        componentName: String,
    },
    data() {
        return {
            localQuantity: this.data.Quantity,
            numPhotos: this.data.Photos.length

        };
    },
    beforeCreate() {
        this.uuid = uuid.toString();
        uuid += 1;
    },
    watch: {
        localQuantity: debounce(function () {
            this.updateDBQuantity();
        }, 1000),
    },
    methods: {
        async updateDBQuantity() {
            let documentCollection = collection(db, "ProgressViewTasks/" + this.data.CatID + "/" + this.data.Status)

            await updateDoc(doc(documentCollection, this.data.ID), {
                Quantity: this.localQuantity
            });
        },
        isMobile() {
            return $(window).width() < 760
        },
        applyRegex(inputString) {
            const regex = new RegExp("..*%2F(.*?)\?alt");
            const matches = inputString.match(regex);
            if (matches) {
                
                return matches[1].substring(0, matches[1].lastIndexOf("%"));
            } else {
                return "Regex Error";
            }
        }
    },

};
</script>

<template>
    <div id="accordionPanelsStayOpen" class="accordion accordion-flush grab">
        <div class="accordion-item">
            <div :id="'flush-heading' + uuid" class="accordion-header d-flex  justify-content-between align-items-center"
                :class="[isMobile() ? 'flex-column align-content-center text-center' : 'flex-row']">
                <div class="d-flex flex-row text-wrap" :style="[isMobile() ? '' : 'width: 30ch']">
                    <div class="d-flex align-self-center fs-4" style="user-select: text">
                        {{ data.Name }}
                    </div>
                </div>
                <div class="d-flex" :class="[isMobile() ? 'flex-column align-items-center' : ' flex-row']"
                    style="width: 20ch">
                    <div class="d-flex align-self-center">QTY:</div>
                    <div class="d-flex flex-row">
                        <input v-model="localQuantity" class="form-control number" type="number" min="0"
                            :max="data.DesiredQuantity" />
                        <div class="d-flex align-self-center ms-2">/</div>
                        <div class="d-flex align-self-center ms-2">
                            {{ data.DesiredQuantity }}
                        </div>
                    </div>
                </div>

                <div class="d-flex" :class="[isMobile() ? 'flex-column align-items-center' : ' flex-row']"
                    :style="[isMobile() ? '' : 'width: 30ch']">
                    <div class="d-flex align-self-center text-wrap">
                        Worker:
                    </div>
                    <div class="d-flex align-self-center " :class="[isMobile() ? '' : ' ms-3']">
                        {{ data.LeadWorker }}
                    </div>
                </div>
                <div class="d-flex flex-row" :class="[isMobile() ? 'justify-content-center' : '']" style="width: 10ch">
                    <div class="d-flex align-self-center" :class="[isMobile() ? '' : ' ms-3']">Priority:</div>
                    <div class="d-flex align-self-center" :class="[isMobile() ? '' : ' ms-2']">
                        {{ data.Priority }}
                    </div>
                </div>

                <button class="accordion-button collapsed noWidth" type="button" data-mdb-toggle="collapse"
                    :data-mdb-target="'#panelsStayOpen-collapse' + uuid" aria-expanded="false"
                    :aria-controls="'panelsStayOpen-collapseOne' + uuid"></button>
            </div>
            <div :id="'panelsStayOpen-collapse' + uuid" class="accordion-collapse collapse"
                :aria-labelledby="'heading' + uuid">
                <div class="accordion-body d-flex justify-content-around"
                    :class="[isMobile() ? 'flex-column w-100' : 'flex-row']"
                    :style="[isMobile() ? 'padding-left:0px!important; padding-right:0px!important' : '']">
                    <div class="d-flex flex-fill flex-column justify-content-between"
                        :class="[isMobile() ? 'w-100' : 'w-25']">
                        <div>
                            {{ data.Description }}
                            <div class="d-flex mt-2  h5" :class="[isMobile() ? 'flex-column' : 'flex-row']">
                                <div class="d-flex " :class="[isMobile() ? '' : 'align-self-center']">
                                    Designer:
                                </div>
                                <div class="d-flex " :class="[isMobile() ? 'align-self-left' : 'ms-2 align-self-center ']">
                                    {{ data.Designer }}
                                </div>
                            </div>
                            <hr class="w-25">
                            <div class="d-flex  w-100" :class="[isMobile() ? 'flex-column' : 'flex-row']">

                                <div class="d-flex flex-column" :class="[isMobile() ? 'w-100' : 'w-50']">
                                    <h5>Files</h5>
                                    <div v-for="(FileData, index) in data.CADFiles" :key="index"
                                        class="d-flex flex-row w-100" :class="[isMobile() ? 'pe-3' : '']">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;" 
                                            :style="[isMobile() ? 'width=20ch;' : '']">{{ applyRegex(FileData) }}</span>
                                        <a :href="FileData" download target="_blank">
                                            <i class="fas fa-download"></i>
                                        </a>
                                    </div>

                                </div>
                                <div class="d-flex flex-column" :class="[isMobile() ? '' : 'ms-3 w-50']">
                                    <h5>Photos</h5>
                                    <div v-for="(PhotoData, index) in data.Photos" :key="index"
                                        class="d-flex flex-row w-100 pe-3">
                                        <span class="me-auto" style="text-overflow: ellipsis; overflow: hidden;" 
                                            :style="[isMobile() ? 'width=20ch;' : '']">{{ applyRegex(PhotoData)
                                            }}</span>
                                        <a :href="PhotoData" download target="_blank">
                                            <i class="fas fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div v-if="isMobile()">
                            <div class="mt-3 w-100 d-flex flex-column ">

                                <div v-if="numPhotos > 0" class="d-inline-flex position-relative mb-3 justify-content-center">
                                    <h4>
                                        <span
                                            class="position-absolute top-100 start-100 translate-middle badge rounded-pill badge-secondary">
                                            {{ numPhotos }}
                                        </span>
                                    </h4>
                                    <Lightbox :Photos="data.Photos" style="width=auto"/>
                                </div>

                                <EditTaskModal :id="uuid" :componentName="componentName" :data="data" buttonClass="w-25 mt-3"/>
                            </div>
                        </div>


                        <div v-if="!isMobile()" class="mt-2">
                            <EditTaskModal :id="uuid" :componentName="componentName" :data="data" buttonClass="w-25 mt-3"/>
                        </div>


                    </div>
                    <!--This is a bad way to reorder the edit button and the files but flex is pain-->
                    <div v-if="!isMobile() && numPhotos > 0" class="d-inline-flex position-relative" style="height: 150px">
                        <h4>
                            <span
                                class="position-absolute top-100 start-100 translate-middle badge rounded-pill badge-secondary">
                                {{ numPhotos }}
                            </span>
                        </h4>
                        <Lightbox :Photos="data.Photos" />

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
