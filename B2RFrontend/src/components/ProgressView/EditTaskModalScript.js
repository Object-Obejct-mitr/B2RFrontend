import InputText from '../Misc/InputText.vue';
import InputTextArea from '../Misc/InputTextArea.vue';
import InputNumber from '../Misc/InputNumber.vue';

export default {
    props: {
        id: String,
        data: Object,
        componentName: String,
        buttonClass: String
    },
    data() {
        return {
            Name: this.data.Name,
            Component: this.data.Component, // Fix
            Description: this.data.Description,
            Designer: this.data.Designer,
            DesiredQuantity: this.data.DesiredQuantity,
            LeadWorker: this.data.LeadWorker,
            Priority: this.data.Priority,
            Quantity: this.data.Quantity,
            CADFiles: this.data.CADFiles,
            Photos: this.data.Photos
        }
    },
    components: { InputText, InputTextArea, InputNumber },
    methods: {
        isMobile() {
            return $(window).width() < 760
        },
    }
};


