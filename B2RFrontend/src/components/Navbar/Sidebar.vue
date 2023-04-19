<script></script>

<template>
    <div v-if="!isMobile()">
        <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
            <div class="position-sticky">
                <div class="list-group list-group-flush mx-3 mt-4">
                    <a v-for="(value, index) in props.Links" :href="'#' + value"
                        class="list-group-item list-group-item-action py-2 ripple" aria-current="true" :key="index">
                        <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>{{ value }}</span>
                    </a>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
 export default{
     props: {
    Links: Object,
    Parent: String
  },
  methods: {
    isMobile() {
            return $(window).width() < 760
        },
  },
  setup(props){
      return{
          props
      }
  }
 }
</script>
<style scoped>
.sidebar {
    width: 240px;
}
</style>
