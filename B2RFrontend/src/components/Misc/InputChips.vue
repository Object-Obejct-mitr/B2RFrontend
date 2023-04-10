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
            type: Array,
            default: []
        }
    },
    data() {
        return {
            currentInput: ''
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('update:modelValue', value);
        },
        saveChip() {
            console.log(this.currentInput);
            if (this.currentInput !== ',' && this.currentInput !== '') {
                const { modelValue, currentInput, set } = this;
                ((set && modelValue.indexOf(currentInput) === -1) || !set) && modelValue.push(currentInput);
                this.updateValue(modelValue);
                this.currentInput = '';
            }
        },
        deleteChip(index) {
            this.modelValue.splice(index, 1);
        },
        backspaceDelete({ which }) {
            which == 8 && this.currentInput === '' && this.modelValue.splice(this.modelValue.length - 1);
        },
        checkComma() {
            if (this.currentInput === ',') {
                this.currentInput = '';
            }
        }
    }
};
</script>

<template>
    <div>
        <div class="form-outline">
            <input :id="id" type="text" class="form-control" v-model="currentInput" @input="checkComma"
                @keypress.,="saveChip" @keydown.delete="backspaceDelete" :required="isRequired"
                :class="[this.modelValue == '' ? '' : 'active']" />
            <label class="form-label" :for="id">{{ label }}</label>

            <div class="form-notch">
                <div class="form-notch-leading"></div>
                <div class="form-notch-middle" :style="'width: ' + notchWidth"></div>
                <div class="form-notch-trailing"></div>
            </div>
        </div>
        <div class="chip-container d-flex mt-2 container-fluid flex-wrap">
            <div class="chip" v-for="(chip, i) of modelValue" :key="chip.label">
                {{ chip }}
                <i class="fa fa-times ms-3" @click="deleteChip(i)"></i>
            </div>
        </div>
    </div>
</template>


<style scoped>
.chip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #4f4f4f;
    cursor: pointer;
    background-color: #eceff1;
    border-radius: 16px;
    transition: opacity 0.3s linear;
    word-wrap: break-word;
    box-shadow: none;
    text-transform: none;
}


input:focus {
    outline: none;
}
</style>