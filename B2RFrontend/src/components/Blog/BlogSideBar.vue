
<template>
    <div>
        <div v-if="view=='list'">
            <h2>Filter by Date</h2>
            <hr/>
            <h2>Filter by Tags</h2>
        </div>
        <div v-else>
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
            default: "list"
        }
    },
    methods: {
        debug() {
            console.log(this.view)
        }
    }
}
</script>