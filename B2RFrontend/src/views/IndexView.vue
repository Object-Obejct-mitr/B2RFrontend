<!-- blog page -->
<!-- 
|| What still needs to be done:
||  - [-] sidebar implementation
||     a. get it to show a condensed version of all of the recent posts
||        like a mini version of list view, when viewing a post.
||     b. filter by tag/date when viewing all of the posts
||  - [-] search bar
||     a. havent started it yet, but once the sidebar filtering is done it 
||        should be pretty much the same just by title/content instead of tags
||  - [x] saving posts to firebase
||     a. maybe no need to generate the preview with tiptap editor
||        (maybe this can be just pulled from the content of the post)
||  - [x] deleting posts
||     a. add this option to the edit post dialog
||  - [ ] adding image support for the posts
||     a. this is a bunch of stuff, have to enable an extension for 
||        the editor library and also set up saving documents and stuff
||        in firebase
||  - [ ] finalizing the editor layout and the toolbars
||    (maybe make it different for mobile view?)
||  - [-] general polish
||     a. get post view to display everything properly
||     b. make sure that everything looks nice
||  - [ ] (possible) pagination for when there are a bunch of posts
 -->
<template>
    <main id="blogView">
        <!-- list posts on list view or blog post on main view -->
        <MainView
            id="mainView"
            :view="view"
            :posts="blogData"
            @show-post="showPost"
            @show-list="showList"
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
                                class="sm btn btn-secondary"
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
                                :key="index"
                                v-model="postData.authors[index]"
                                class="author"
                            />
                            <button
                                class="sm btn btn-secondary"
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
                            <Editor v-model="postData.content" @editor-created="setUpEditor" />
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
                            data-mdb-dismiss="modal"
                            @click="savePost()"
                        >
                            Save changes
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-mdb-dismiss="modal"
                            @click="deletePost()"
                        >
                            Delete Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- <button @click="switchViews()">switch views</button> -->
</template>

<script>
import MainView from "@/components/Blog/MainView.vue";
import BlogSideBar from "@/components/Blog/BlogSideBar.vue";
import Editor from "@/components/Blog/Editor.vue";
import BlogData from "@/assets/BlogData.json";
import Tags from "@/assets/Tags.json";

import { db } from "../firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    addDoc,
    where,
    getDoc,
    setDoc,
    updateDoc
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
                id: ""
            },
        };
    },
    mounted() {
        this.fetchPosts();
        this.fetchTags();
    },
    methods: {
        resetPostData() {
            this.postData = {
                title: "",
                date: "",
                authors: [],
                tags: [],
                content: "",
                delta: [],
                id: ""
            }
        },
        async debug() {
            console.log(this.postData)
        },
        setUpEditor(editorObj) {
            this.editor = editorObj;
            this.editor.commands.setContent(this.postData.content)
        },
        async fetchPosts() {
            let posts = {};
            posts.value = [];
            // fetch all users
            const blogPostsSnapshot = await getDocs(
                collection(db, "blogPosts/vE5AQMbXcBlxrvAUVYrX/posts")
            );
            for (const doc of blogPostsSnapshot.docs) {
                let tmp = doc.data();
                tmp.id = doc.id;
                posts.value.push(tmp);
            }
            this.blogData = posts.value;
        },
        async fetchTags() {
            this.tags = [];
            const blogPostsSnapshot = await getDocs(
                collection(db, "/blogPosts/5eg31wh1BqwLekP8H47z/tagsList")
            );
            for (const doc of blogPostsSnapshot.docs) {
                for ( const tag of doc.data().tagNames) {
                    this.tags.push(tag);
                }
            }
        },
        switchViews() {
            this.view = this.view == "list" ? "post" : "list";
        },
        showList() {
            this.view = "list";
        },  
        showPost(index) {
            this.view = "post";
            this.postIndex = index;
        },
        createModifyPost(postType) {
            this.postType = postType;
            if (postType == "create") {
                //create a post
                this.resetPostData();
            } else if (postType == "modify") {
                //edit a post
                this.postData = this.blogData[this.postIndex];
            }
        },
        async savePost() {
            // prune tags and authors in the current post
            let temp = this.postData.tags.filter( a => a.trim() != "");
            this.postData.tags = temp;
            temp = this.postData.authors.filter( el => el.trim() != "");
            this.postData.authors = temp;
            if (this.postType == "create") {
                let tmp = new Date();
                let date = `${tmp.getUTCMonth()}/${tmp.getUTCDate()}/${tmp.getUTCFullYear()}`
                await addDoc(collection(db, "blogPosts/vE5AQMbXcBlxrvAUVYrX/posts"), {
                    title: this.postData.title,
                    date: date,
                    authors: this.postData.authors,
                    tags: this.postData.tags,
                    content: this.postData.content 
                })
                console.log("finished")
            } else if (this.postType == "modify") {
                console.log("looking up a specific doc")
                const docRef = doc(db, "blogPosts/vE5AQMbXcBlxrvAUVYrX/posts", this.postData.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    await updateDoc(docRef, {
                        title: this.postData.title,
                        authors: this.postData.authors,
                        tags: this.postData.tags,
                        content: this.postData.content
                    })
                } 
            }
            this.fetchPosts();
        },
        async deletePost() {
            const docRef = doc(db, "blogPosts/vE5AQMbXcBlxrvAUVYrX/posts", this.postData.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await deleteDoc(docRef);
            }
            this.fetchPosts();
        },
    },
};
</script>

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    gap: 15px;

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
}

.tags {
    display: flex;
    column-gap: .1%;
    .tag {
        background-color: #3b72ca1c;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0.25% 0.5%;
    }
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

.sideBar {
    display: flex;
    flex-direction: column;
}

.buttonSpacing {
    margin: 0 auto;
    margin-top: 10%;
    margin-bottom: 10%;
    width: fit-content;
}

.sm {
    width: fit-content;
}
</style>
