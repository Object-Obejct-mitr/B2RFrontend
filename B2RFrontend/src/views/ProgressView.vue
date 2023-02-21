<script setup>
import Task from "../components/ProgressView/Task.vue"
</script>

<template>
  <main>

    <div class="d-flex flex-column">

      <div class="h-100 d-flex align-items-center mt-5 flex-fill">
        <div class="d-flex justify-content-center flex-column flex-fill">
          <h1 class="text-center">Drivetrain</h1>
          <div class="d-flex flex-row flex-fill justify-content-around">
            <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
              <h2 class="text-center">To-Do</h2>
              <div id="drivetrainTodo" data-mdb-sortable="sortable" class="sortable-list"
                data-mdb-connected-list="#drivetrainDone">
                <div class="sortable-item">
                  <Task component="Component 0" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 1" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 2" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 3" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 4" />
                </div>
              </div>
            </div>
            <div class="vr vr-blurry"></div>
            <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
              <h2 class="text-center">Done</h2>

              <div id="drivetrainDone" data-mdb-sortable="sortable" class="sortable-list"
                data-mdb-connected-list="#drivetrainTodo">
                <div class="sortable-item">
                  <Task component="Component 5" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 6" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 7" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-100 d-flex align-items-center mt-5 flex-fill">
        <div class="d-flex justify-content-center flex-column flex-fill">
          <h1 class="text-center">Electronics</h1>
          <div class="d-flex flex-row flex-fill justify-content-around">
            <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
              <h2 class="text-center">To-Do</h2>
              <div id="drivetrainTodo" data-mdb-sortable="sortable" class="sortable-list"
                data-mdb-connected-list="#drivetrainDone">
                <div class="sortable-item">
                  <Task component="Component 0" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 1" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 2" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 3" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 4" />
                </div>
              </div>
            </div>
            <div class="vr vr-blurry"></div>
            <div class="d-flex flex-column flex-fill ms-5 me-auto w-50">
              <h2 class="text-center">Done</h2>

              <div id="drivetrainDone" data-mdb-sortable="sortable" class="sortable-list"
                data-mdb-connected-list="#drivetrainTodo">
                <div class="sortable-item">
                  <Task component="Component 5" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 6" />
                </div>
                <div class="sortable-item">
                  <Task component="Component 7" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
