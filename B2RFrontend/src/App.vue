<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
</script>

<template>
    <header id="sticky">
        <Navbar />
    </header>
    <RouterView />
</template>


<style>

#sticky {
    top: 0;
    z-index: 1;
    background-color: white;
}

</style>