<script>
export default {
    props: {
        notchWidth: String,
        label: String,
        id: String,
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 999,
        },
        isRequired: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Number,
            default: NaN,
        },
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<!--Creates a "notch" in each input border to place the input name on said border-->
<template>
    <div class="form-outline">
        <input
            :id="id"
            type="number"
            class="form-control"
            :value="modelValue"
            :required="isRequired"
            :class="[isNaN(modelValue) ? '' : 'active']"
            @input="updateValue"
        />

        <label class="form-label" :for="id">{{ label }}</label>

        <div class="form-notch">
            <div class="form-notch-leading"></div>
            <div
                class="form-notch-middle"
                :style="'width: ' + notchWidth"
            ></div>
            <div class="form-notch-trailing"></div>
        </div>
    </div>
</template>
