import InputText from '../Misc/InputText.vue';
import InputTextArea from '../Misc/InputTextArea.vue';
import InputNumber from '../Misc/InputNumber.vue';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../firebase"

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
            Component: this.data.Component,
            Description: this.data.Description,
            Designer: this.data.Designer,
            DesiredQuantity: this.data.DesiredQuantity,
            LeadWorker: this.data.LeadWorker,
            Priority: this.data.Priority,
            Quantity: this.data.Quantity,
            CADFiles: this.data.CADFiles,
            Photos: this.data.Photos,
            NewPhotos: [],
            newCADFiles: [],
            DeletedCADFiles: [],
            DeletedPhotos: [],
            ModifiedState: JSON.parse(JSON.stringify({
                Name: this.data.Name,
                Component: this.data.Component,
                Description: this.data.Description,
                Designer: this.data.Designer,
                DesiredQuantity: this.data.DesiredQuantity,
                LeadWorker: this.data.LeadWorker,
                Priority: this.data.Priority,
                Quantity: this.data.Quantity,
                CADFiles: this.data.CADFiles,
                Photos: this.data.Photos,
                NewPhotos: [],
                newCADFiles: [],
                DeletedCADFiles: [],
                DeletedPhotos: []
              }))
        }
    },
    components: { InputText, InputTextArea, InputNumber },
    methods: {
        isMobile() {
            return $(window).width() < 760;
        },
        revertState() {
            console.log(this.ModifiedState);
            this.ModifiedState = JSON.parse(JSON.stringify({
                Name: this.data.Name,
                Component: this.data.Component,
                Description: this.data.Description,
                Designer: this.data.Designer,
                DesiredQuantity: this.data.DesiredQuantity,
                LeadWorker: this.data.LeadWorker,
                Priority: this.data.Priority,
                Quantity: this.data.Quantity,
                CADFiles: this.data.CADFiles,
                Photos: this.data.Photos,
                NewPhotos: [],
                NewCADFiles: [],
                DeletedCADFiles: [],
                DeletedPhotos: []
              }))
        },
        applyRegex(inputString) {
            const regex = new RegExp("..*%2F(.*?)\?alt");
            const matches = inputString.match(regex);
            if (matches) {
                
                return matches[1].substring(0, matches[1].lastIndexOf("%"));
            } else {
                return "Regex Error";
            }
        },
        onPhotoSelected(event) {
            const photos = Array.from(event.target.files);
            this.ModifiedState.NewPhotos = Array.from(this.ModifiedState.NewPhotos.concat(photos));
        },
        deletePhotoFromExisting(index) {
            this.ModifiedState.DeletedPhotos.push(this.ModifiedState.Photos[index]);
            this.ModifiedState.Photos.splice(index, 1);
        },
        deletePhotoFromNew(index){
            this.ModifiedState.NewPhotos.splice(index, 1);
        },
        onCADFileSelected(event) {
            const CADFiles = Array.from(event.target.files);
            this.ModifiedState.NewCADFiles = Array.from(this.ModifiedState.NewCADFiles.concat(CADFiles));
        },
        deleteFileFromExisting(index) {
            this.ModifiedState.DeletedCADFiles.push(this.ModifiedState.CADFiles[index]);
            this.ModifiedState.CADFiles.splice(index, 1);
        },
        deleteFileFromNew(index) {
            this.ModifiedState.NewCADFiles.splice(index, 1);
        },
        deleteTask() {
            let storageRef;
            console.log("Files Added:");
            console.log(Array.from(this.ModifiedState.NewPhotos));
            console.log(Array.from(this.ModifiedState.NewCADFiles));
            console.log("Files Removed:");
            console.log(Array.from(this.ModifiedState.DeletedCADFiles));
            console.log(Array.from(this.ModifiedState.DeletedPhotos));
            console.log("Modified Task Data:");

            // this.ModifiedState.NewPhotos.forEach(element => {
            //     console.log(element.name);
            // });
            // this.ModifiedState.NewCADFiles.forEach(element => {
            //     console.log(element.name);
            // });
            // console.log("Files Removed:");
            // this.ModifiedState.DeletedPhotos.forEach(element => {
            //     console.log(element);
            // });
            // this.ModifiedState.DeletedCADFiles.forEach(element => {
            //     console.log(element);
            // });

        }
    }
};


