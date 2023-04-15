<template>
    <div>
        <div v-if="view == 'list'" class="sideBar">
            <!-- 
                !scrapped for now bc it's too much work to implement
                <h2>Filter by Date</h2>
            <hr />
            <div id="dateAccordion" class="accordion accordion-flush" >
                <template v-for="year in years" :key="year">
                    <div class="accordion-item">
                        <button 
                            class="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                            :data-mdb-target="'#flush-collapseOne' + year" aria-expanded="false" :aria-controls="'flush-collapseOne'+year">
                            {{ year }}
                        </button>
                    </div>
                    <div 
                        :id="'flush-collapseOne' + year" class="accordion-collapse collapse accordion-content"
                        :aria-labelledby="'flush-headingOne' + year" data-mdb-parent="#dateAccordion">
                        <div v-for="month in months" :key="month">
                            {{  month }}
                        </div>  
                    </div>
                </template>
            </div> -->
            <h2>Search for a post</h2>
            <input 
                type="text" class="form-control" 
                placeholder="Search" aria-label="Search" 
                @input="$event => searchFilter($event.target.value)" 
            />
            <hr />
            <h2>Filter by Tags</h2>
            <div class="tagsContainer">
                <Tag 
                    v-for="tag in tags" 
                    :key="tag" 
                    :tag="tag" 
                    :class="{'selected': isSelected(tag), 'tag': true}" 
                    @click="addToFilter(tag); toggleSelected(tag)"
                />
            </div>
        </div>
        <div v-else class="sideBar">
            <h2>Recent Posts</h2>
        </div>
        <!-- <button @click="debug">
            debug
        </button> -->
    </div>
</template>

<script>
import Tag from "./Tag.vue";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// just make year start from 2023 since this is the earliest that we have posts
const today = new Date();
// years from 2023 to current year
// const years = Array.from({length: today.getFullYear() - 2012}, (v, k) => k + 2023);

const years = Array.from({length: today.getFullYear() - 2019}, (v, k) => k + 2020).reverse();
export default {
    components: {
        Tag,
    },
    props: {
        // either "post" or "list"
        // if the view is post:
        //  show recent posts in the sidebar
        // if the view is list:
        //  show filtering options (date then tags) on the sidebar
        view: {
            type: String,
            required: true,
            default: "list",
        },
        posts: {
            type: Object,
            required: true,
            default: null,
        },
        tags: {
            type: Array,
            required: true,
            default: null,
        },
    },
    data() {
        return {
            selectedTags: [],
            availbleDates: {},
            years: years,
            months: months,
        }
    },
    computed: {
        dates() {
            
            return "";
        }
    },
    mounted() {
        console.log(this.tags)
        console.log(this.dates)
    },
    methods: {
        searchFilter(value) {
            console.log(value);
        },
        debug() {
            console.log(this.view);
        },
        addToFilter(tag) {
            // emit to parent that the filter has been updated
            console.log(tag);
        },
        toggleSelected(tagName) {
            if (this.selectedTags.includes(tagName)) {
                this.selectedTags.splice(this.selectedTags.indexOf(tagName), 1);
            } else {
                this.selectedTags.push(tagName);
            }
        },
        isSelected(tagName) {
            return this.selectedTags.includes(tagName);
        }
        
    },
};
</script>

<style lang="scss">
.accordion-content {
    
}

.tagsContainer {
    display: flex;
    flex-direction: row;
    gap: 1%;
    
    .tag {
        background-color: #3b72ca1c;
        cursor: pointer;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0.25% 0.5%;

        &:hover {
            background-color: #3b72ca;
            color: white;
        }
        
    }

    .selected {
        background-color: #3b72ca;
        color: white;
    }
    
}

</style>
