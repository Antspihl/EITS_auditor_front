<template>
  <v-btn
    class="mr-4"
    @click="downloadMap(mainStore.urls)"
    :disabled="mainStore.urls.length < 1 && Object.keys(mainStore.urlMeasures).length < 1"
    prepend-icon="mdi-download"
  >
    Lae alla audit
  </v-btn>

</template>

<script setup lang="ts">
import {useMainStore} from "@/api/MainStore";
import {Measure} from "@/molecules/types";
import {TranslateMeasure, TranslationEnum} from "@/molecules/translation";

const mainStore = useMainStore();

const sortedKeys: string[] = [];
const translatedKeysDict: { [key: string]: string } = {};


function setTranslatedKeys() {
  for (const measure in mainStore.urlMeasures) {
    const measures = mainStore.urlMeasures[measure];
    if (Array.isArray(measures)) {
      measures.forEach((measure) => {
        for (const key in measure) {
          if (typeof TranslationEnum[key as keyof typeof TranslationEnum] !== 'undefined') {
            sortedKeys.push(key);
            translatedKeysDict[key] = TranslationEnum[key as keyof typeof TranslationEnum];
          } else {
            sortedKeys.push(key);
            translatedKeysDict[key] = key;
          }
        }
      });
    } else {
      console.error(`Measures for key '${measure}' is not an array.`);
    }
  }
  sortedKeys.sort((a, b) => a.localeCompare(b));
}

function getMeasureTitle(obj: Measure) {
  for (const key in obj) {
    if ((TranslateMeasure as Record<string, any>)[key] !== undefined) {
      return TranslateMeasure[key as keyof typeof TranslateMeasure];
    }
  }
  return "Tundmatu meetod"
}

function mapToText(urls: string[]): string {
  setTranslatedKeys();
  let text = '';
  let firstDone = false;
  for (const url of urls) {
    if (firstDone) text += '\n\n';
    text += `URL: ${url}\n-----------------------------\n`;
    const measures = mainStore.urlMeasures[url];
    for (const measure of measures) {
      text += `${getMeasureTitle(measure)}\n`;
      const rows = [];
      for (const key in measure) {
        if (Object.prototype.hasOwnProperty.call(measure, key)) {
          rows.push(`${translatedKeysDict[key]}: ${measure[key as keyof Measure]}\n`);
        }
      }
      rows.sort();
      text += rows.join('');
      text += '-----------------------------\n';
    }
    firstDone = true;
  }
  return text;
}

function downloadMap(urls: string[]) {
  const text = mapToText(urls);
  const blob = new Blob([text], {type: 'text/plain'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${new Date().toLocaleString('et-EE').replace(/:/g, '-').replace(/\./g, '-').replace(/,/g, '')}-E-ITS-Audit.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
</script>
