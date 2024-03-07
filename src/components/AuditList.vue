<template>
  <v-infinite-scroll
    height="100"
    v-if="loadingMeasures"
  />
  <AllMeasures v-if="!loadingMeasures" :measures="mainStore.measures"/>
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import {onBeforeMount, ref} from "vue";
import AllMeasures from "@/pages/AllMeasures.vue";


const mainStore = useMainStore();
const loadingMeasures = ref(false);

onBeforeMount(() => {
  loadingMeasures.value = true;
  mainStore.fetchMeasures().then(() => loadingMeasures.value = false)
})
</script>
