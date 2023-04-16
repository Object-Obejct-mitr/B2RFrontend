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
                
                <!-- <div class="d-flex flex-column mt-5">
                    <h2>Permissions</h2>
                    <table class="table align-middle mb-0 bg-white mt-3">
                        <thead class="bg-light">
                            <tr class="text-center">
                                <th>Role</th>
                                <th>Perm1</th>
                                <th>Perm2</th>
                                <th>Perm3</th>
                                <th>Perm4</th>
                                <th>Perm5</th>
                                <th>Perm6</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                <td>
                                    <p>Team Mentor</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Team Captain</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Vice Captain</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Component Head</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Manufacturer</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Other</p>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            disabled
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <input
                                            id="flexCheckDefault"
                                            class="form-check-input centerBox"
                                            type="checkbox"
                                            value=""
                                            checked
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex flex-row mt-3">
                        <button type="button" class="btn btn-primary">
                            Modify Permissions
                        </button>
                        <button type="button" class="btn btn-primary ms-3">
                            Add / Remove Roles
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
    </main>
</template>

<style scoped></style>
