import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import ProgressView from "../views/ProgressView.vue";
import AdminConsoleView from "../views/AdminConsoleView.vue";
import ContactsView from "../views/ContactsView.vue";
import OrgchartView from "../views/OrgchartView.vue";
import ProfileView from "../views/ProfileView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: IndexView,
        },
        {
            path: "/progress",
            name: "progress",
            component: ProgressView,
        },
        {
            path: "/adminconsole",
            name: "adminconsole",
            component: AdminConsoleView,
        },
        {
            path: "/contacts",
            name: "contacts",
            component: ContactsView,
        },
        {
            path: "/orgchart",
            name: "orgchart",
            component: OrgchartView,
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
        },
    ],
});

export default router;
