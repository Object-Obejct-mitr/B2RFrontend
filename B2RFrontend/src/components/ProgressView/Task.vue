<script setup>
import Carousel from "./Carousel.vue"
</script>

<!-- TODO: Get unique IDs per element-->
<script>
export default {
  props: {
    component: String,
  }
};
</script>


<template>
  <div class="accordion accordion-flush" id="accordionPanelsStayOpen">
    <div class="accordion-item">
      <div class="
            accordion-header
            d-flex
            justify-content-between
            align-items-center
          " :id="'flush-heading' + component.replace(/\s/g, '')">
        <div class="d-flex flex-row">
          <div class="d-flex align-self-center fs-4">
            {{ component }}
          </div>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex align-self-center">QTY:</div>
          <input class="ms-2 form-control number" value="3" type="number" />
          <div class="d-flex align-self-center ms-2">/</div>
          <div class="d-flex align-self-center ms-2">10</div>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex align-self-center">Owner:</div>
          <div class="d-flex align-self-center ms-2">None</div>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex align-self-center">Worker:</div>
          <div class="d-flex align-self-center ms-2">None</div>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex align-self-center">Priority:</div>
          <div class="d-flex align-self-center ms-2">5</div>
        </div>

        <button class="accordion-button collapsed noWidth" type="button" data-mdb-toggle="collapse"
          :data-mdb-target="'#panelsStayOpen-collapse' + component.replace(/\s/g, '')" aria-expanded="false"
          :aria-controls="'panelsStayOpen-collapseOne' + component.replace(/\s/g, '')"></button>
      </div>
      <div :id="'panelsStayOpen-collapse' + component.replace(/\s/g, '')" class="accordion-collapse collapse"
        :aria-labelledby="'heading' + component.replace(/\s/g, '')">
        <div class="accordion-body d-flex flex-row justify-content-around ">
          <div class="d-flex flex-column flex-fill w-25">
            <div>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
            <div class="mt-2">
              <button type="button" class="btn btn-primary">Edit Task</button>
            </div>
          </div>

          <div class="d-flex flex-column align-items-center flex-fill">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.noWidth {
  width: auto !important;
}

.number {
  max-width: 75px;
  height: 1lh;
}

p {
  height: 100%;
}
</style>