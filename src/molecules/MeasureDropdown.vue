<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-row>
        <v-col>
          {{ name }}
        </v-col>
        <v-col
          cols="1">
          <StatusIcon :status="areAllTrue(measure)"/>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list
        v-for="(key) in sortedKeys"
        density="compact"
        lines="one"
        :key="key"
      >
        <v-list-item>
          <v-row>
            <v-col>
              {{ translatedKeysDict[key] }}
            </v-col>
            <v-col
              cols="1"
            >
              <StatusIcon :status="measure[key]"/>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {Measure} from "@/molecules/types";
import {TranslationEnum} from "@/molecules/translation";
import {onBeforeMount, ref} from "vue";
import StatusIcon from "@/molecules/StatusIcon.vue";

const sortedKeys = ref<string[]>([]);
const translatedKeysDict = ref<{ [key: string]: string }>({});


function setTranslatedKeys() {
  for (const key in measure) {
    if (typeof TranslationEnum[key as keyof typeof TranslationEnum] !== 'undefined') {
      sortedKeys.value.push(key);
      translatedKeysDict.value[key] = TranslationEnum[key as keyof typeof TranslationEnum];
    } else {
      sortedKeys.value.push(key);
      translatedKeysDict.value[key] = key;
    }
  }
  sortedKeys.value.sort((a, b) => a.localeCompare(b));
}

function areAllTrue(measure: Measure): boolean {
  for (const key in measure) {
    if (measure[key as keyof Measure] !== true) {
      return false;
    }
  }
  return true;
}


const {measure, name} = defineProps<{
  measure: Measure;
  name: string;
}>();

onBeforeMount(() => {
  setTranslatedKeys();
})
</script>


