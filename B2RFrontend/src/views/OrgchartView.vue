<template>
    <main>
        <div class="d-flex flex-row">
            <Sidebar :Links="this.roles" Parent="Orgchart" />
            <div class="d-flex flex-column flex-fill container-fluid">

                <div class="d-flex flex-column container-fluid" :id="role" v-for="(role, index) in this.roles" :key="index">
                    <h1 class="text-center" :id="role + index">{{ pluralize(role) }}</h1>
                    <div v-if="this.categories[role] != undefined && this.categories[role].length > 0 && !isMobile()"
                        class="w-100">

                        <div class="d-flex flex-row justify-content-center mt-5 bg-primary"
                            v-for="i in Math.ceil(this.categories[role].length / 3)" :key="i">

                            <div v-if="(i - 1) * 3 < this.categories[role].length" class="col w-33">
                                <OrgchartUser :user="this.categories[role][(i - 1) * 3]" />
                            </div>
                            <div v-if="(i - 1) * 3 + 1 < this.categories[role].length" class="col w-33">
                                <OrgchartUser :user="this.categories[role][(i - 1) * 3 + 1]" />
                            </div>
                            <div v-if="(i - 1) * 3 + 2 < this.categories[role].length" class="col w-33">
                                <OrgchartUser :user="this.categories[role][(i - 1) * 3 + 2]" />
                            </div>

                        </div>
                    </div>
                    <div v-if="this.categories[role] != undefined && this.categories[role].length > 0 && isMobile()"
                        class="w-100">

                        <div class="d-flex flex-row justify-content-center mt-5 bg-primary"
                            v-for="(value, index) in this.categories[role]" :key="index">
                            <OrgchartUser :user="value" />

                        </div>
                    </div>

                </div>

            </div>
        </div>

    </main>
</template>


<script>
import OrgchartUser from "../components/Orgchart/OrgchartUser.vue";
import Sidebar from "../components/Navbar/Sidebar.vue";
import { db } from "../firebase";
import { collection, doc, getDocs, setDoc, query, where, orderBy } from "firebase/firestore";
import { ref, computed, watchEffect } from 'vue';
export default {
    async mounted() {
        //const categories = ref({});
        //const roles = ["Component Head", "Team Mentor", "Team Captain", "Manufacture"]


        console.log(this.roles);
        await this.fetchRoles();
        await this.fetchUsers();

        // watchEffect(() => {
        //     fetchUsers();
        // });
    },
    methods: {
        isMobile() {
            return $(window).width() < 760
        },
        async fetchUsers() {
            const userList = collection(db, "users");
            for (let role of this.roles) {
                this.categories[role] = {};
                console.log("Fetching " + role)
                let temparr = [];
                const q = query(userList, where("role", "==", role));
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs)
                querySnapshot.forEach((doc) => {
                    temparr.push(doc.data());
                })
                this.categories[role] = temparr;
            }
            // const querySnapshot = await getDocs(catigoryList);
            // console.log(categories.value.Capt)
            console.log(JSON.parse(JSON.stringify(this.categories)))
        },
        async fetchRoles() {
            const roleList = collection(db, "roles");
            const roleQ = query(roleList, orderBy('Weight', 'asc'));
            const querySnapshotRole = await getDocs(roleQ);
            querySnapshotRole.forEach((doc) => {
                this.roles = [...this.roles, doc.data().Name];
            })
        },
        pluralize
    },
    data() {
        return {
            roles: [],
            categories: {}
        }
    },
    components: {
        OrgchartUser,
        Sidebar

    }


}
</script>
