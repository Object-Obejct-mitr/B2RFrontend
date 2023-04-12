<!-- blog page -->

<template>
    <main id="blogView">
        <!-- list posts on list view or blog post on main view -->
        <MainView
            id="mainView"
            :view="view"
            :posts="blogData"
            @show-post="showPost"
        />
        <div class="sideBar">
            <button
                v-if="view == 'list'"
                class="buttonSpacing btn btn-secondary"
                data-mdb-target="#createModal"
                data-mdb-toggle="modal"
                @click="createModifyPost('create')"
            >
                New Post
            </button>
            <button
                v-else
                class="buttonSpacing btn btn-secondary"
                data-mdb-toggle="modal"
                data-mdb-target="#createModal"
                @click="createModifyPost('modify')"
            >
                Edit Post
            </button>

            <BlogSideBar
                id="blogSideBar"
                :view="view"
                :posts="blogData"
                :tags="tags"
            />
        </div>
        <!-- create/modify modal -->
        <div
            id="createModal"
            class="modal fade modal-xl"
            tabindex="-1"
            aria-labelledby="modalTitle"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content" :style="{ 'min-height': '75vh' }">
                    <div class="modal-header">
                        <h4 id="modalTitle" class="modal-title">
                            {{ view == "list" ? "Create Post" : "Modify Post" }}
                        </h4>
                        <button
                            type="button"
                            class="btn-close"
                            data-mdb-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body content">
                        <input
                            v-model="postData.title"
                            placeholder="Post Title"
                            :style="{ width: '25%' }"
                        />
                        <!-- Tags -->
                        <div class="tags">
                            <h5>Tags:</h5>
                            <input
                                v-for="(tag, index) in postData.tags"
                                :key="index"
                                v-model="postData.tags[index]"
                                class="tag"
                                placholder="tag name"
                            />
                            <button
                                class="sm btn btn-secondary squareBtn"
                                @click="postData.tags.push('tag name')"
                            >
                                +
                            </button>
                        </div>

                        <!-- Authors-->
                        <div class="authors">
                            <h5>Authors:</h5>
                            <input
                                v-for="(author, index) in postData.authors"
                                :key="author"
                                v-model="postData.authors[index]"
                                class="author"
                            />
                            <button
                                class="sm btn btn-secondary squareBtn"
                                @click="postData.authors.push('Author Name')"
                            >
                                +
                            </button>
                        </div>
                        <span
                            style="
                                display: flex;
                                flex-grow: 1;
                                flex-direction: column;
                                box-sizing: border-box;
                                padding: 5px;
                            "
                            class="card"
                        >
                            <Editor v-model="content" />
                        </span>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-mdb-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="savePost()"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <button @click="debug()">switch views</button>
</template>

<script>
import MainView from "@/components/Blog/MainView.vue";
import BlogSideBar from "@/components/Blog/BlogSideBar.vue";
import Editor from "@/components/Blog/Editor.vue";
import BlogData from "@/assets/BlogData.json";
import Tags from "@/assets/Tags.json";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export default {
    components: {
        BlogSideBar,
        MainView,
        Editor,
    },
    data() {
        return {
            view: "list",
            blogData: BlogData,
            tags: Tags,
            postIndex: 0,
            postType: "",
            editor: null,
            content: "this is some stuff",
            postData: {
                title: "",
                date: "",
                authors: [],
                tags: [],
                content: "",
                delta: [],
            },
        };
    },
    mounted() {
        // this.fetchPosts();
    },
    methods: {
        setUpEditor(editorObj) {
            console.log("setting up editor object");
            // this.editorObj = editorObj;
        },
        async fetchPosts() {
            let posts = {};
            posts.value = [];
            // fetch all users
            const blogPostsSnapshot = await getDocs(
                collection(db, "blogPosts")
            );
            for (const pageDoc of blogPostsSnapshot.docs) {
                const blogPostSnapshot = await getDocs(
                    collection(pageDoc.ref, "posts")
                );
                // console.log(pageDoc.ref)
                blogPostSnapshot.forEach((doc) => {
                    posts.value.push(doc.data());
                });
            }
            console.log("posts");
            console.log(posts);
            this.blogData = posts.value;
        },
        debug() {
            this.view = this.view == "list" ? "post" : "list";
        },
        showPost(index) {
            this.view = "post";
            this.postIndex = index;
            console.log(index);
        },
        createModifyPost(postType) {
            this.postType = postType;
            if (postType == "create") {
                //create a post
                console.log("creating a post");
            } else if (postType == "modify") {
                //edit a post
                console.log("editing a post");
                this.postData = this.blogData[this.postIndex];
                // this.editorObj.setContents(this.postData.delta, 'api')
            }
        },
        savePost() {
            // prune tags and authors in the current post
            console.log(this.postIndex);
            if (this.postType == "create") {
                // index does not matter
                // update the post in firebase
            } else if (this.postType == "modify") {
                // just add it to firebase
                // grab the information
                let post = this.postData;
                console.log(post);
            }
        },
    },
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.tags,
.authors {
    display: flex;
    overflow: auto;
    gap: 5px;
    align-items: baseline;
}

.tag,
.author {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    border: 1px solid #3b71ca;
    /* color: #a0d18c; */
    width: 15ch;
    height: 30px;
    padding-left: 10px;
}

.tag:focus,
.author:focus {
    outline: none;
    outline: 1px solid #3b71ca;
    /* color: #3b71ca; */
}

.squareBtn {
    aspect-ratio: 1/1;
    height: 5vh;
    padding: 0px !important;
}

#blogView {
    display: flex;
    width: 90%;
    min-height: 75vh;
    max-height: calc(99vh - 106px - 30px);
    margin: 15px auto;
    gap: 10px;
}

#mainView {
    /* outline: 1px solid fuchsia; */
    width: 70vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(99vh - 106px - 30px);
}

#blogSideBar {
    /* outline: 1px solid black; */
    width: 20vw;
    flex-grow: 1;
    height: fit-content;
}

.buttonSpacing {
    margin: 0 auto;
    margin-top: 10%;
    margin-bottom: 10%;
    padding-bottom: 15%;
    width: fit-content;
}

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

.sm {
    width: fit-content;
}
</style>
