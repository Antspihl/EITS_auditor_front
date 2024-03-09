<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ name }}
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
              <v-icon
                v-if="measure[key]"
                icon="mdi-check-circle"
                color="primary"
              ></v-icon>
              <v-icon
                v-else
                icon="mdi-close-circle"
                color="accent"
              ></v-icon>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { Measure } from "@/molecules/types";
import { TranslationEnum } from "@/molecules/translation";
import {onBeforeMount, ref} from "vue";

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
}


const { measure, name } = defineProps<{
  measure: Measure;
  name: string;
}>();

onBeforeMount(() => {
  setTranslatedKeys();
})
</script>


