<template>
  <v-tabs
    v-if="mainStore.urls.length > 0"
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
    v-if="mainStore.urls.length > 0"
    :url=tab
  />
  <v-container
    v-else
  >
    <v-card>
      <v-card-title>
        Lisa päritavad URLid sättetes, et saaksid neid siin vaadata
        <v-btn
          color="primary"
          @click="router.push('/settings')"
        >
          Lisama
        </v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {onMounted, ref} from "vue";
import AuditList from "@/components/AuditList.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const mainStore = useMainStore();
const tab = ref<string>(mainStore.urls[0]);

function getOnlyIpAddress(url: string) {
  return url.split("/")[2];
}

onMounted(() => {
  mainStore.fetchForAllUrls()
})
</script>
