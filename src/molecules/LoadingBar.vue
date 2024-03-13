<template>
  <v-progress-linear
    stream
    color="primary"
    height="10"
    :buffer-value="mainStore.getLoadedMeasures / mainStore.getAmountOfMeasures * 100"
  />
</template>

<script setup lang="ts">
import { useMainStore } from '@/api/MainStore';

const mainStore = useMainStore();


</script>
