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
            column
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
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="auto"
        >
          <v-btn
            color="info"
            @click="selectAll"
          >
            Vali kõik
          </v-btn>
        </v-col>
        <v-col
          cols="auto"
        >
          <v-btn
            color="primary"
            @click="saveMeasures"
            :disabled="selectedMeasures.length === 0 || selectedMeasures === mainStore.selectedMeasures"
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

function saveMeasures() {
  if (selectedMeasures.value.length !== 0) {
    selectedMeasures.value.sort((a, b) => a.localeCompare(b));
    mainStore.selectedMeasures = selectedMeasures.value;
    alert('Meetmete muudatused salvestatud!');
    localStorage.setItem('measures', JSON.stringify(selectedMeasures.value));
  }
}

function selectAll() {
  if (selectedMeasures.value.length === mainStore.allMeasures.length) {
    selectedMeasures.value = [];
  } else {
    selectedMeasures.value = mainStore.allMeasures;
  }
}

onMounted(() => {
  selectedMeasures.value = mainStore.selectedMeasures;
});
</script>
