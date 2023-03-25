<template>
    <div v-if="view=='list'">
        <!-- for loop here to iterate over the first x posts -->
        List view
    </div>
    <div v-else>
        <!-- quill editor here -->
        Blog view
    </div>

</template>

<script>
export default {
    props: {
        // can be either "list" or "post"
        // if it is "list" view then it shows eveyrthing
        // if it is "post" view then it shows a specific post
        view: {
            type: String,
            required: true,
            default: "list"
        },
        // the content of the blog post
        // not always required, only used for "blog" view
        postContent: {
            type: Object,
            required: false,
            default: null
        },
        // list of the posts
        // not always required, only used for "list" view
        postList: {
            type: Array,
            required: false,
            default: null
        }

    }
}

</script>