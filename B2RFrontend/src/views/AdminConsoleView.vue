<script setup>
import PermisionEditorTable from "../components/AdminDash/PermisionEditorTable.vue";
import ComponentList from "../components/AdminDash/ComponentList.vue";
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
                <ComponentList />
                <div class="d-flex flex-column mt-5">
                    <h2>Permissions</h2>
                    <PermisionEditorTable />
                </div>
                
                
            </div>
        </div>
    </main>
</template>

<style scoped></style>
