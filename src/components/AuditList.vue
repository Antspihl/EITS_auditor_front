<template>
  <LoadingBar
    v-if="!mainStore.areLoaded(url) && !mainStore.areLoaded(url)"
    :url="url"
  />
  <AllMeasures
    :url="url"
  />
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import {onMounted, onUpdated} from "vue";
import AllMeasures from "@/pages/AllMeasures.vue";
import LoadingBar from "@/molecules/LoadingBar.vue";

const mainStore = useMainStore();
const props = defineProps<{
  url: string;
}>();

onMounted(() => {
  mainStore.fetchAllMeasuresForUrl(props.url)
})
onUpdated(() => {
  if (!mainStore.loadingArray.includes(props.url) &&
    !mainStore.areLoaded(props.url)) {
    mainStore.fetchAllMeasuresForUrl(props.url)
  }
})
</script>
