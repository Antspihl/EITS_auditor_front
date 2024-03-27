<template>
  <v-container>
    <v-col
      v-if="mainStore.urlMeasures[url]"
    >
      <v-expansion-panels
        variant="accordion"
      >
        <MeasureDropdown
          v-for="(measure, index) in mainStore.urlMeasures[url]"
          :key="index"
          :measure="measure"
          :name="getMeasureTitle(measure)"
        />
      </v-expansion-panels>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import {useMainStore} from "@/api/MainStore";
import MeasureDropdown from "@/components/MeasureDropdown.vue";
import {Measure} from "@/molecules/types";
import {TranslateMeasure} from "@/molecules/translation";

const mainStore = useMainStore();

function getMeasureTitle(obj: Measure) {
  for (const key in obj) {
    if ((TranslateMeasure as Record<string, any>)[key] !== undefined) {
      return TranslateMeasure[key as keyof typeof TranslateMeasure];
    }
  }
  return "Tundmatu meetod"
}

defineProps<{
  url: string;
}>();

</script>
