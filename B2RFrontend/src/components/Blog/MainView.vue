<template>
    <div v-if="view == 'list'">
        <!-- for loop here to iterate over the first x posts -->
        <div
            v-for="(post, index) in posts"
            :key="JSON.stringify(post)"
            class="card postList"
            @click="showPost(index)"
        >
            <span class="postInfo">
                <h1>{{ post.title }}</h1>
                <span>{{ post.date }}</span>
            </span>
            <p class="preview">{{ post.preview }}</p>
            <!-- <hr v-if="index != posts.length - 1"/> -->
        </div>
    </div>
    <div v-else>
        <!-- quill editor here -->
        main Blog view
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
            default: "list",
        },
        posts: {
            type: Object,
            required: true,
            default: null,
        },
    },
    emits: ["showPost"],
    methods: {
        showPost(index) {
            this.$emit("showPost", index);
        },
    },
};
</script>

<style>
#postListContainer {
    margin-top: 10px;
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid red;
}

.postList {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
}

.postInfo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.preview {
    /* height: 2ch; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
