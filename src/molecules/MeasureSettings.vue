<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      Meetmed
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-col>
          <span>Vali meetmed, mida kontrollida</span>
          <v-chip-group
            v-model="selectedMeasures"
            multiple
            filter
          >
           <v-chip
              v-for="measure in mainStore.allMeasures"
              :key="measure"
              :value="measure"
           >
              {{ measure }}
           </v-chip>
          </v-chip-group>
          <v-btn
            color="primary"
            @click="saveMeasures"
            :disabled="selectedMeasures === mainStore.selectedMeasures || selectedMeasures.length === 0"
          >
            Salvesta
          </v-btn>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {onMounted, ref} from "vue";

const mainStore = useMainStore();
const selectedMeasures = ref<string[]>([]);
const allMeasures = ref<string[]>([]);

function saveMeasures () {
  if (selectedMeasures.value.length !== 0) {
    mainStore.selectedMeasures = selectedMeasures.value;
  }
}

onMounted(() => {
  selectedMeasures.value = mainStore.selectedMeasures;
  allMeasures.value = mainStore.allMeasures;
});
</script>
