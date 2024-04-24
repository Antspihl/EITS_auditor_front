<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      IP-Aadressid
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-textarea
          :label=urlsLabel
          :hint=urlsHint
          :placeholder=urlsPlaceholder
          v-model="mainStore.urlString"
          :loading="loading"
          auto-grow
          clearable
        >
        </v-textarea>
      </v-row>
      <v-row class="mt-0 pb-4" justify="end">
        <v-col cols="auto" class="mt-0">
          <v-tooltip
            :text=restoringTooltip
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                color="info"
                class="mr-4"
                @click="restoreIpAddresses"
                :disabled="lastIpAddresses === '' ||lastIpAddresses === mainStore.urlString"
              >
                Taasta
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip
            :text=savingTooltip
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                @click="saveIpAddresses"
                :loading="loading"
                :disabled="mainStore.urlString === ''|| mainStore.urlString === mainStore.urls.join(', ')"
              >
                Salvesta
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-divider class="pt-4"></v-divider>
      <IpGenerators/>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useMainStore} from "@/api/MainStore";
import IpGenerators from "@/molecules/IpGenerators.vue";

const mainStore = useMainStore();
const lastIpAddresses = ref('');
const loading = ref(false);

const urlsLabel = "Hetkel salvestatud URLid (Siia saab kirjutada)";
const urlsHint = "URLid peavad olema eraldatud koma või semikooloniga, nt: http://localhost:8080, http://192.168.1.1";
const urlsPlaceholder = "http://localhost:8080, http://192.168.1.1";
const savingTooltip = "Salvestamine võib aega võtta, sest kontrollitakse iga aadressi.";
const restoringTooltip = "Taasta seisund enne viimast salvestamist";


async function saveIpAddresses() {
  loading.value = true;
  lastIpAddresses.value = mainStore.urlString;
  const urls = mainStore.urlString.split(/[,;]/).map(url => url.trim()).filter(Boolean);
  const uniqueUrls = Array.from(new Set(urls));
  uniqueUrls.forEach((url, index) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      uniqueUrls[index] = 'http://' + url;
    }
  });
  const testPromises = uniqueUrls.map(url => mainStore.testURL(url));
  const results = await Promise.all(testPromises);
  const workingURLs = uniqueUrls.filter((url, index) => results[index]);
  mainStore.urlString = workingURLs.join(', ');
  mainStore.urls = workingURLs;
  loading.value = false;

  if (workingURLs.length === 0) {
    alert('Ükski URL ei tööta. Kontrolli, et aadressid oleksid õiged.')
  } else if (workingURLs.length < uniqueUrls.length) {
    alert('Mõni URL ei töödanud. Kontrolli, et aadressid oleksid õiged.');
  } else {
    alert('URL-id salvestatud');
  }

  // Save urls to local storage
  localStorage.setItem('urls', mainStore.urls.join(', '));

  await mainStore.fetchForAllUrls()
}

function restoreIpAddresses() {
  mainStore.urlString = lastIpAddresses.value;
  lastIpAddresses.value = '';
}

onMounted(() => {
  mainStore.urlString = mainStore.urls.join(', ');
});
</script>
