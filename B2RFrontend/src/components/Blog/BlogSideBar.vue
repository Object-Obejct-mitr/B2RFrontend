<template>
    <div>
        <div v-if="view == 'list'" class="sideBar">
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
                    @click="toggleTagFilter(tag); toggleSelected(tag)"
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
    emits:  ['tagFilter', 'searchFilter'],
    data() {
        return {
            selectedTags: [],
        }
    },
    mounted() {
        // console.log(this.tags)
        // console.log(this.dates)
    },
    methods: {
        searchFilter(value) {
            this.$emit("searchFilter", value);
        },
        debug() {
            console.log(this.view);
        },
        toggleTagFilter(tag) {
            // emit to parent that the filter has been updated
            this.$emit("tagFilter", tag);
            // console.log(tag);
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
