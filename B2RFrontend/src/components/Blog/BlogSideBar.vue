<template>
    <div>
        
        <div class = "sideBar" v-if="view == 'list'">
            <button class="buttonSpacing btn btn-secondary" @click="createModifyPost()">New Post</button>
            <h2>Filter by Date</h2>
            <hr />
            <h2>Filter by Tags</h2>
        </div>
        <div class = "sideBar" v-else>
            <button class="buttonSpacing btn btn-secondary" @click="createModifyPost()">Edit Post</button>
            <h2>Recent Posts</h2>
        </div>
        <!-- <button @click="debug">
            debug
        </button> -->
    </div>
</template>

<script>
export default {
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
    },
    emits: ["createModifyPost"],
    methods: {
        debug() {
            console.log(this.view);
        },
        createModifyPost() {
            if (this.view == 'list') {
                //create a post
                this.$emit("createModifyPost", "create");
            } else {
                //edit a post
                this.$emit("createModifyPost", "modify");
            }
        }
    },
};
</script>

<style>
.sideBar {
    display: flex;
    flex-direction: column;
}

.buttonSpacing {
    margin: 0 auto;
    margin-top: 10%; 
    margin-bottom: 10%; 
    padding-bottom: 15%;
    width: fit-content;
}

</style>