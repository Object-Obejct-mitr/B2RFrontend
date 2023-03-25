<!-- blog page -->

<template>
    <main>
        <!-- list posts on list view or blog post on main view -->
        <MainView :view="view"/>
        <BlogSideBar :view="view"/>
    </main>
</template>


<script>
import MainView from "@/components/Blog/MainView.vue"
import BlogSideBar from "@/components/Blog/BlogSideBar.vue"

export default {
    components: {
        BlogSideBar
    },
    data() {
        return {
            view: "list"
        }
    }
}


</script>
