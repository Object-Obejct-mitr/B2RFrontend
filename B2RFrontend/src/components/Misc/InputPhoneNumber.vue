<script>
export default {
    props: {
        notchWidth: String,
        label: String,
        id: String,
        isRequired: {
            type: Boolean,
            default: false
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
    <div class="form-outline ">
        <input :id="id" type="tel" class="form-control" :value="modelValue" @input="updateValue" :required="isRequired"
            :class="[this.modelValue == '' ? '' : 'active']" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
        <label class="form-label" :for="id">{{ label }}</label>

        <div class="form-notch">
            <div class="form-notch-leading"></div>
            <div class="form-notch-middle" :style="'width: ' + notchWidth"></div>
            <div class="form-notch-trailing"></div>
        </div>
    </div>
</template>