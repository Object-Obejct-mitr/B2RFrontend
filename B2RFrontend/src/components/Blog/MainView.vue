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
        <QuillEditor theme="bubble" read-only="true" @ready="postReady" />
    </div>
</template>

<script>
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { QuillEditor } from "@vueup/vue-quill";

export default {
    components: {
        QuillEditor,
    },
    props: {
        // either list or post view
        // if it is list view then it shows eveyrthing
        // if it is post view then it shows a specific post
        //  note: the prop "view" will be the post index in the array
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
    data() {
        return {
            quill: null,
            postContent: null,
            postIndex: 0,
            readOnly: false,
        };
    },
    methods: {
        showPost(index) {
            if (index == -1) {
                this.postIndex = -1;
            } else {
                this.postIndex = index;
            }
            this.$emit("showPost", index);
        },
        postReady(quill) {
            this.quill = quill;
            console.log("editor ready");
            console.log(this.view);

            console.log(this.posts[parseInt(this.postIndex)]);
            this.postContent = this.posts[parseInt(this.postIndex)].delta;
            quill.setContents(
                this.posts[parseInt(this.postIndex)].delta,
                "api"
            );
        },

        toggleReadOnly() {
            console.log(this.readOnly);
            this.readOnly = !this.readOnly;
            console.log(this.readOnly);
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
