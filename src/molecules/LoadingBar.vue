<template>
  <v-progress-linear
    stream
    color="primary"
    height="10"
    :buffer-value="mainStore.getPercentage(url)"
  />
  <h2
    class="text-center pt-6"
  >
    {{ mainStore.getLoadingMessage(url) }} {{ mainStore.getPercentage(url) }}%
  </h2>
</template>

<script setup lang="ts">
import {useMainStore} from '@/api/MainStore';

const mainStore = useMainStore();

defineProps<{
  url: string;
}>();
</script>
