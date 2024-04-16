<template>
  <router-view />
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import {onBeforeMount} from "vue";

const mainStore = useMainStore();

onBeforeMount(async () => {
  if (localStorage.getItem('urls')) mainStore.urls = localStorage.getItem('urls')!.split(', ');
  if (localStorage.getItem('measures')) mainStore.selectedMeasures = JSON.parse(localStorage.getItem('measures')!);

  //Remove not working urls from list
  const testPromises = mainStore.urls.map(url => mainStore.testURL(url));
  const results = await Promise.all(testPromises);
  mainStore.urls = mainStore.urls.filter((url, index) => results[index]);
  localStorage.setItem('urls', mainStore.urls.join(', '));
})
</script>
