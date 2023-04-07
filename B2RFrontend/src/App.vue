<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
</script>

<template>
    <header>
        <Navbar />
    </header>
    <RouterView />
</template>
