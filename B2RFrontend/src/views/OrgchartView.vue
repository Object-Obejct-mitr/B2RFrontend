<script setup>
import OrgchartUser from "../components/Orgchart/OrgchartUser.vue"
import Sidebar from "../components/Navbar/Sidebar.vue"

</script>

<template>
    <main>
        <div class="d-flex flex-row">
            <Sidebar />
            <div class="d-flex flex-column flex-fill">
                <div class="d-flex flex-column mt-5">
                    <h1 class="text-center">Team Mentors</h1>
                    <div class="row mt-3">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>

                    </div>
                </div>
                <div class="d-flex flex-column mt-5">
                    <h1 class="text-center">Team Captains</h1>
                    <div class="row mt-3">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column mt-5">
                    <h1 class="text-center">Component Heads</h1>
                    <div class="row mt-3">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column mt-5">
                    <h1 class="text-center">Manufacturers</h1>
                    <div class="row mt-3">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                        <div class="col">
                            <OrgchartUser />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>