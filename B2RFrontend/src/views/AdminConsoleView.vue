<script setup>
import PermisionEditorTable from "../components/PermissionEditorTable/PermisionEditorTable.vue";
</script>

<template>
    <main>
        <div class="d-flex flex-row ms-3">

            <!--Main Content Container-->
            <div
                id="adminConsoleViewContainer"
                class="d-flex flex-column flex-fill ms-3 mt-3 me-5"
            >
                <h1>Admin Console</h1>
                <hr />
                <!--Components Box-->
                <div class="d-flex flex-column mt-5">
                    <h2>Components</h2>
                    <ul class="list-group list-group-light ms-3 w-25 mt-3">
                        <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            Drivetrain<span
                                class="badge badge-primary rounded-pill"
                                >3 Tasks</span
                            >
                        </li>
                        <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            Electronics<span
                                class="badge badge-primary rounded-pill"
                                >1 Task</span
                            >
                        </li>
                        <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            Lifter<span class="badge badge-primary rounded-pill"
                                >0 Tasks</span
                            >
                        </li>
                        <li
                            class="list-group-item d-flex justify-content-between align-items-center"
                        >
                            Grabber<span
                                class="badge badge-primary rounded-pill"
                                >6 Tasks</span
                            >
                        </li>
                    </ul>
                    <div class="d-flex flex-row">
                        <button type="button" class="btn btn-primary">
                            Add Component
                        </button>
                        <button type="button" class="btn btn-danger ms-3">
                            Remove Component
                        </button>
                    </div>
                </div>
                <div class="d-flex flex-column mt-5">
                    <h2>Permissions</h2>
                    <PermisionEditorTable />
                </div>
                
                
            </div>
        </div>
    </main>
</template>

<style scoped></style>
