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
        <BlogSideBar
            id="blogSideBar"
            :view="view"
            :posts="blogData"
            :tags="tags"
        />
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
        };
    },
    mounted() {},
    methods: {
        debug() {
            this.view = this.view == "list" ? "post" : "list";
        },
        showPost(index) {
            this.view = "post";
            console.log(index);
        },
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
    outline: 1px solid black;
    width: 20vw;
    flex-grow: 1;
    height: fit-content;
}
</style>
