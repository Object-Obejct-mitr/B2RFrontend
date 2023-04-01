<script>
export default {
    props: {
        notchWidth: String,
        label: String,
        vModelReference: String,
        id: String,
        isRequired: {
            type: Boolean,
            default: false
        },
        numRows: {
            type: Number,
            default: 1
        },
        modelValue: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
};
</script>

<!--Creates a "notch" in each input border to place the input name on said border-->
<template>
    <div class="form-outline">
        <textarea :id="id" class="form-control" :rows="numRows" :value="modelValue" @input="updateValue"
            :required="isRequired" :class="[this.modelValue == '' ? '' : 'active']"> </textarea>
        <label class="form-label" :for="id">{{ label }}</label>

        <div class="form-notch">
            <div class="form-notch-leading"></div>
            <div class="form-notch-middle" :style="'width: ' + notchWidth"></div>
            <div class="form-notch-trailing"></div>
        </div>
    </div>
</template>