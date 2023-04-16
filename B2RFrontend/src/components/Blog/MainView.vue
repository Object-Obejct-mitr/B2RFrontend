<template>
    <div v-if="view == 'list'">
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
            <span class="tags">
                <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
            <p class="preview" v-html="post.content.replace(/<[^>]+>/g, ' ')"></p>
        </div>
    </div>
    <div v-else>
        <button class="btn btn-primary back-btn" @click="switchViews" >Go back</button>
        
        <span>
            <h2>{{posts[postIndex].title}}</h2>
            Written by {{ authors }} on {{ posts[postIndex].date }}
        </span>
        <div v-html="posts[postIndex].content"></div>
    </div>
</template>

<script>

export default {
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
    emits: ["showPost", "showList"],
    data() {
        return {
            postContent: null,
            postIndex: 0,
            readOnly: false,
        };
    },
    computed: {
        authors() {
            if (this.postIndex != -1) {
                let out = "";
                let authors = this.posts[this.postIndex].authors;
                for (let [index, author] of authors.entries()) {
                    out += author
                    if ( authors.length > 2 && index < authors.length - 1) {
                        out += ", " 
                    } else {
                        out += " "
                    }
                    if ( index == authors.length - 2) {
                        out += "and "
                    }
                }
                return out;
            } else {
                return null;
            }
        }
    },
    methods: {
        switchViews() {
            this.$emit("showList");
        },
        debug() {
            console.log(this.posts[this.postIndex])
        },
        showPost(index) {
            this.postIndex = index;
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

    },
};
</script>

<style>
.back-btn {
    width: 15%;
}

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
