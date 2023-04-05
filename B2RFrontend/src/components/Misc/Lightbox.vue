<template>
    <div>
      <!-- <button @click="showSingle">Show single picture.</button>
      <button @click="showMultiple">Show a group of pictures.</button> -->
      <img class="rounded-4 shadow-4 ms-2" :src="Photos[0]" height="150" @click="showMultiple">
      <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="Photos"
        :index="indexRef"
        @hide="onHide"
        
      ></vue-easy-lightbox>
    </div>
  </template>
  
  <script>
  // If VueApp is already registered with VueEasyLightbox, there is no need to register it here.
  import VueEasyLightbox from 'vue-easy-lightbox'
  import { ref, defineComponent } from 'vue'
  
  export default defineComponent({
    components: {
      VueEasyLightbox
    },
    props: {
        Photos: Array
    },
    setup() {
      const visibleRef = ref(false)
      const indexRef = ref(0) // default 0
      const imgsRef = ref([])
      // Img Url , string or Array of string
      // ImgObj { src: '', title: '', alt: '' }
      // 'src' is required
      // allow mixing
  
      const onShow = () => {
        visibleRef.value = true
      }
      const showSingle = () => {

        onShow()
      }
      const showMultiple = () => {
        indexRef.value = 0 // index of imgList
        onShow()
      }
      const onHide = () => (visibleRef.value = false)
  
      return {
        visibleRef,
        indexRef,
        imgsRef,
        showSingle,
        showMultiple,
        onHide
      }
    }
  })
  </script>