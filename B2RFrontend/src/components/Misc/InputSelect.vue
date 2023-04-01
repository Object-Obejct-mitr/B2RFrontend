
<!--This currently doesn't work, but i leave it as an exercise to the reader-->
<script>
export default {
    props: {
        label: String,
        vModelReference: String,
        id: String,
        isRequired: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleChange(event) {
            this.$emit("input", event.target.value);
        },

    },
    mounted() {
        this.$emit("input", this.selected);
    },
};
</script>

<!--Creates a "notch" in each input border to place the input name on said border-->
<template>
    <div class="form-outline ">
        <i class="fas fa-angle-down trailing"></i>


        <select :id="id" class="form-control" @change="$emit('update:vModelReference', $event.target.value)"
            :required="isRequired">
            <slot>

            </slot>
        </select>
        <label class="form-label" :for="id">{{ label }}</label>

        <div class="form-notch">
            <div class="form-notch-leading"></div>
            <div class="form-notch-trailing"></div>
        </div>
    </div>
</template>
