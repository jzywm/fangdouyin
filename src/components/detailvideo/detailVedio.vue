<template>
  <div class="detail-vedio" id="detailVideoStore.detailVideo.id">
    <isLoding v-if="detailVideoStore.isLoading.value" width="100vw" />
    <div v-else>
      <detailHrader />
      <detailVideoSrc />
      <detailLeft />
      <detailRight />
      <detailVideoComment />
      <detailFooter />
    </div>
  </div>
</template>

<script lang="ts" setup name="detailVideo">
import detailHrader from '@/components/detailvideo/detailHrader.vue'
import detailLeft from '@/components/detailvideo/detailLeft.vue'
import detailRight from '@/components/detailvideo/detailRight.vue'
import detailFooter from '@/components/detailvideo/detailFooter.vue'
import detailVideoComment from '@/components/detailvideo/detailVideoComment.vue'
import detailVideoSrc from '@/components/detailvideo/detailVideoSrc.vue'
import isLoding from '@/components/userput/loginIn.vue'

import { useDetailVideoStore } from '@/stores/detailVediio'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const route = useRoute()
const fangfa = useDetailVideoStore()
const detailVideoStore = storeToRefs(useDetailVideoStore())

onBeforeMount(() => {
    const id = (route.params.id) as string
    if (id) {
    fangfa.getdetailvideo(id)
  }
})


</script>

<style scoped>
:root {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.detail-vedio {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>