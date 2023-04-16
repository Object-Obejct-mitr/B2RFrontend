<script></script>

<template>
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
        <div class="position-sticky">
            <div class="list-group list-group-flush mx-3 mt-4">
                <a
                    v-for="i in props.settings"
                    href="/orgchart/#{{i}}"
                    class="list-group-item list-group-item-action py-2 ripple"
                    aria-current="true"
                >
                    <i class="fas fa-tachometer-alt fa-fw me-3"></i
                    ><span>{{i}}</span>
                </a>
                            </div>
        </div>
    </nav>
</template>
<script>
 export default{
     props: {
    settings: Object
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
