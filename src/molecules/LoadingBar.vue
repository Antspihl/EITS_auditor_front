<template>
  <v-progress-linear
    stream
    color="primary"
    height="10"
    :buffer-value="mainStore.getLoadedMeasures / mainStore.getAmountOfMeasures * 100"
  />
  <h2
    class="text-center pt-6"
    v-if="mainStore.loadingMessage"
  >
    {{ mainStore.loadingMessage }} ({{ mainStore.getLoadedMeasures }} / {{ mainStore.getAmountOfMeasures }})
  </h2>
</template>

<script setup lang="ts">
import {useMainStore} from '@/api/MainStore';

const mainStore = useMainStore();
</script>
