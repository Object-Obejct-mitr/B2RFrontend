import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import ProgressView from "../views/ProgressView.vue";
import AdminConsoleView from "../views/AdminConsoleView.vue";
import ContactsView from "../views/ContactsView.vue";
import OrgchartView from "../views/OrgchartView.vue";
import ProfileView from "../views/ProfileView.vue";


function requireAuth(to, from, next) {
    const isAuthenticated = false;
    console.log("Checking Auth")
    if (isAuthenticated) {
        // If the user is authenticated, allow the navigation to the requested page
        next();
    } else {
        // If the user is not authenticated, redirect to the login page
        alert("You do not have access to the page at " + to.fullPath + ". If you believe this to be an error, please contact a mentor")
        next('/');
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: IndexView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/progress",
            name: "progress",
            component: ProgressView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/adminconsole",
            name: "adminconsole",
            component: AdminConsoleView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/contacts",
            name: "contacts",
            component: ContactsView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/orgchart",
            name: "orgchart",
            component: OrgchartView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
            meta: {
                requiresAuth: false
            }
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        requireAuth(to, from, next);
    } else {
        next();
    }
});

export default router;
