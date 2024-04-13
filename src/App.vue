<template>
  <router-view />
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import {onMounted} from "vue";

const mainStore = useMainStore();

onMounted(() => {
  if (localStorage.getItem('urls')) mainStore.urls = localStorage.getItem('urls')!.split(', ');
  if (localStorage.getItem('measures')) mainStore.selectedMeasures = JSON.parse(localStorage.getItem('measures')!);
})
</script>
