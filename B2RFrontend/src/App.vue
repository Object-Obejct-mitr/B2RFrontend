<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/Navbar/NavBar.vue";
</script>

<template>
    <header>
        <NavBar />
    </header>

    <RouterView />
</template>
