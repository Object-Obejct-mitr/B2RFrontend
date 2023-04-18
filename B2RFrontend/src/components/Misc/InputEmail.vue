<script>
export default {
    props: {
        notchWidth: String,
        label: String,
        id: String,
        isRequired: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    methods: {
        updateValue(event) {
            console.log("Email:");
            console.log(this.modelValue);
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
            type="email"
            class="form-control"
            :value="modelValue"
            :required="isRequired"
            :class="[modelValue == '' ? '' : 'active']"
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
