<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <span>
        {{ tag }}
    </span>
</template>


<script>
export default {
    props: {
        tag: {
            type: String,
            required: true,
            default: "tag"
        },
    }
    
}
</script>
<style>
    
</style>