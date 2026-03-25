<template>
  <div class="detailVideo" id="">

  </div>
</template>

<script lang="ts" setup name="detailVideo">
import { useRoute } from 'vue-router'

const route = useRoute()

import { useDetailVideoStore } from '@/stores/detailVediio'
const detailVideoStore = useDetailVideoStore()
const videoId = route.params.id

</script>

<style></style>