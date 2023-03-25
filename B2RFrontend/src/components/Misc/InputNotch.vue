<script>
export default {
    props: {
        width: String      
    },
};
</script>

<!--Creates a "notch" in each input border to place the input name on said border-->
<template>
    <div class="form-notch">
        <div class="form-notch-leading"></div>
        <div class="form-notch-middle" :style="'width: ' + width"></div>
        <div class="form-notch-trailing"></div>
    </div>
</template>