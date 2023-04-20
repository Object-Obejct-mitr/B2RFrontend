<template>
    <nav id="navHeader" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand">
                <img
                    src="/src/assets/img/barn2roboticslogo.png"
                    height="80"
                    loading="lazy"
                />
            </a>
            <ul class="navbar-nav me-auto ml-30 mt-2 lh-lg">
                <li class="navbar-item">
                    <RouterLink to="/" aria-current="page" class="nav-link">
                        <h4>Blog</h4>
                    </RouterLink>
                </li>
                <li v-if="viewProgresstool" class="navbar-item">
                    <RouterLink
                        to="/progresstool"
                        class="nav-link"
                        aria-current="page"
                        href="#"
                    >
                        <h4>Progress Tool</h4>
                    </RouterLink>
                </li>
                <li v-if="viewOrgchart" class="navbar-item">
                    <RouterLink
                        to="/orgchart"
                        class="nav-link"
                        aria-current="page"
                        href="#"
                    >
                        <h4>Org Chart</h4>
                    </RouterLink>
                </li>
                <li v-if="viewContacts" class="navbar-item">
                    <RouterLink
                        to="/contacts"
                        class="nav-link"
                        aria-current="page"
                        href="#"
                    >
                        <h4>Contacts</h4>
                    </RouterLink>
                </li>
                <li v-if="isAdmin" class="navbar-item">
                    <RouterLink
                        to="/adminconsole"
                        class="nav-link"
                        aria-current="page"
                        href="#"
                    >
                        <h4>Admin Console</h4>
                    </RouterLink>
                </li>
            </ul>
            <NavbarUser />
        </div>
    </nav>
</template>

<script>
import NavbarUser from "./NavbarUser.vue";
import getPermission from "../Misc/Permssions";

export default {
    components: {
        NavbarUser
    },
    data() {
        return {
            viewProgresstool: false,
            viewOrgchart: false,
            viewContacts: false,
            isAdmin: false,
        }
    },
    async mounted() {
        window.addEventListener('user-localstorage-changed', (event) => {
            console.log("user changed")
            this.getPerms()
        });
        this.getPerms()
    },

    methods: {
        async getMultiPermissions(email, actions) {
            let res = []
            for (let i = 0; i < actions.length; i++) {
                res.push(await getPermission(email, actions[i]))
            }
            return res;
        },
        async getPerms() {
            // fetch user data
            const data = localStorage.getItem('user');
            if (data) {
                this.user = JSON.parse(data);

                [this.viewProgresstool, this.viewOrgchart, this.viewContacts, this.isAdmin] = [...await this.getMultiPermissions(this.user.email, ['ViewProgresstool', 'ViewOrgchart', 'ViewContacts', 'Admin'])]
                
                // for some reason using .then doesnt work, driving me crazy at 2:30 am
                // this.getMultiPermissions(this.user.email, ['ViewProgresstool', 'ViewOrgchart', 'ViewContacts', 'Admin']).then((res) => {
                    
                //     [this.viewProgresstool, this.viewOrgchart, this.viewContacts, this.isAdmin] = [...res];
                //     console.log(res)

                //     console.log("--------------------")
                //     console.log(this.viewContacts>-1)
                //     console.log(this.viewOrgChart>-1)
                //     console.log(this.viewProgressTool>-1)
                //     console.log(this.isAdmin>-1)

                // })
                
            }
        }
    }
}
</script>


<style scoped>
.router-link-active {
    color: #000 !important;
}

</style>
