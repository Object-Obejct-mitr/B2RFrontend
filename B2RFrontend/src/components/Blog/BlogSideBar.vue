
<template>
    <div>
        <div v-if="view=='list'">
            side bar list view
        </div>
        <div v-else>
            side bar post view
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