import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";
import Toast from "vue-toastification";

import "./assets/main.css";
import "./mdb/css/mdb.min.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
});

app.use(Toast)

app.mount("#app");
