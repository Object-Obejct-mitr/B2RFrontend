<!-- blog page -->

<template>
    <main id="blogView">
        <!-- list posts on list view or blog post on main view -->
        <MainView id="mainView" :view="view"/>
        <span class="space"></span>
        <BlogSideBar id="blogSideBar" :view="view"/>
        <button @click="debug()">
            switch views
        </button>
    </main>
</template>


<script>
import MainView from "@/components/Blog/MainView.vue"
import BlogSideBar from "@/components/Blog/BlogSideBar.vue"

export default {
    components: {
        BlogSideBar,
        MainView
    },
    data() {
        return {
            view: "list"
        }
    },
    methods: {
        debug() {
            this.view = (this.view == "list" ? "post" : "list")
        }

    }
}


</script>

<style>
.space {
    flex-grow: 1;
}

#blogView {
    display: flex;
    width: 90%;
    margin: 0 auto;
}

#mainView {
    outline: 1px solid fuchsia;
    width: 70vw;
}

#blogSideBar {
    outline: 1px solid black;
    width: 25vw;
}


</style>
