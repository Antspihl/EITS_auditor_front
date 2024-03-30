<template>
  <LoadingBar
    v-if="!mainStore.areLoaded(url) && !mainStore.areLoaded(url) && mainStore.selectedMeasures.length > 0"
    :url="url"
  />
  <AllMeasures
    v-if="mainStore.selectedMeasures.length > 0"
    :url="url"
  />
  <v-container
    v-else
  >
    <v-card>
      <v-card-title>
        Lisa päritavad meetmed sätetes, et saaksid neid siin vaadata
        <v-btn
          color="primary"
          @click="router.push('Settings')"
        >
          Lisama
        </v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import {onMounted, onUpdated} from "vue";
import AllMeasures from "@/pages/AllMeasures.vue";
import LoadingBar from "@/molecules/LoadingBar.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const mainStore = useMainStore();

const props = defineProps<{
  url: string;
}>();

onMounted(() => {
  mainStore.fetchAllMeasuresForUrl(props.url)
})
onUpdated(() => {
  if (!mainStore.loadingArray.includes(props.url) &&
    !mainStore.areLoaded(props.url) && mainStore.selectedMeasures.length > 0) {
    mainStore.fetchAllMeasuresForUrl(props.url)
  }
})
</script>
