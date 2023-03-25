
<template>
    <div>
        this is the blog side bar component
        <button @click="debug">
            debug
        </button>
    </div>
</template>

<script>

export default {
    props: {
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