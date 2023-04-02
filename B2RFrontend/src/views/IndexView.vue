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
    
            <button v-if="view == 'list'" class="buttonSpacing btn btn-secondary" @click="createModifyPost('create')" data-mdb-toggle='modal' data-mdb-target='#createModal'>New Post</button>
            <button v-else class="buttonSpacing btn btn-secondary" @click="createModifyPost('modify')" data-mdb-toggle='modal' data-mdb-target='#createModal'>Edit Post</button>
    
            <BlogSideBar
                id="blogSideBar"
                :view="view"
                :posts="blogData"
                :tags="tags"
                
            />
        </div>
        <!-- create/modify modal -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="view == 'list'" class="modal-title" id="exampleModalLabel1">Create Post</h5>
                        <h5 v-if="view == 'post'" class="modal-title" id="exampleModalLabel2">Modify Post</h5>
                        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>Title: </label>
                        <!-- <input v-model="postData.title"> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
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
import BlogData from "@/assets/BlogData.json";
import Tags from "@/assets/Tags.json";

export default {
    components: {
        BlogSideBar,
        MainView,
    },
    data() {
        return {
            view: "list",
            blogData: BlogData,
            tags: Tags,
            postIndex: 0,
            postData: null,
        };
    },
    mounted() {},
    methods: {
        debug() {
            this.view = this.view == "list" ? "post" : "list";
        },
        showPost(index) {
            this.view = "post";
            this.postIndex = index;
            console.log(index);
        },

        createModifyPost(postType) {
            if (postType == "create") {
                //create a post
                console.log("creating a post");
                
                
            } else if (postType == "modify") {
                //edit a post
                console.log("editing a post")
                this.postData = this.blogData[this.postIndex];
                
                
            }
        }
    },
};
</script>

<style>
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
</style>
