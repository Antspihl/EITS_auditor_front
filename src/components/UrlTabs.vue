<template>
  <v-tabs
    v-model="tab"
    grow
  >
    <v-tab
      v-for="url in mainStore.urls"
      :key="url"
      :value="url"
    >
      {{ getOnlyIpAddress(url) }}
    </v-tab>
  </v-tabs>
  <AuditList
    :url=tab
  />
</template>

<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {onMounted, ref} from "vue";
import AuditList from "@/components/AuditList.vue";

const mainStore = useMainStore();
const tab = ref<string>(mainStore.urls[0]);

function getOnlyIpAddress(url: string) {
  return url.split("/")[2];
}

onMounted(() => {
  mainStore.fetchForAllUrls()
})
</script>
