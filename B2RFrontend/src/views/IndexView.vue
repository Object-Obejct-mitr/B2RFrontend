<!-- blog page -->

<template>
    <main id="blogView">
        <!-- list posts on list view or blog post on main view -->
        <MainView id="mainView" :view="view" :posts="blogData"/>
        <span class="space"></span>
        <BlogSideBar id="blogSideBar" :view="view"/>
    </main>
    <button @click="debug()">
        switch views
    </button>
</template>


<script>
import MainView from "@/components/Blog/MainView.vue"
import BlogSideBar from "@/components/Blog/BlogSideBar.vue"
import BlogData from "@/assets/BlogData.json"

export default {
    components: {
        BlogSideBar,
        MainView
    },
    data() {
        return {
            view: "list",
            blogData: BlogData
        }
    },
    mounted() {
        
    },
    methods: {
        debug() {
            this.view = (this.view == "list" ? "post" : "list")
        }
    },
    
}


</script>

<style>
.space {
    /* flex-grow: 1; */
}

#blogView {
    display: flex;
    width: 90%;
    min-height: 75vh;
    margin: 0 auto;
}

#mainView {
    outline: 1px solid fuchsia;
    width: 70vw;
}

#blogSideBar {
    outline: 1px solid black;
    width: 20vw;
    flex-grow: 1;
}


</style>
