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
          v-model="ipAddresses"
          :loading="loading"
          auto-grow
          clearable
        >
        </v-textarea>
      </v-row>
      <v-row class="mt-0" justify="end">
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
                :disabled="lastIpAddresses === '' ||lastIpAddresses === ipAddresses"
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
                :disabled="ipAddresses === ''|| ipAddresses === mainStore.urls.join(', ')"
              >
                Salvesta
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
      <h5>IP aadresside generaator</h5>
      <v-row>
        <v-col>
          <v-text-field
            :label=subnetLabel
            :placeholder=subnetPlaceholder
            v-model="subnet"
            :rules="subnetRules"
            clearable
          />
        </v-col>
        <v-col cols="2">
          <v-text-field
            :label=portLabel
            v-model="port"
            :placeholder=portPlaceholder
            :hint=portHint
            :rules="portRules"
            type="number"
            hide-spin-buttons
          />
        </v-col>
        <v-col cols="auto">
          <v-btn
            class="mt-2"
            color="info"
            @click="makeIpAddressesFromSubnet"
          >
            Genereeri IP-d
          </v-btn>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore();
const subnet = ref<string>();
const port = ref<string>();
const ipAddresses = ref('');
const lastIpAddresses = ref('');
const loading = ref(false);

const urlsLabel = "Hetkel salvestatud URLid (Siia saab kirjutada)";
const urlsHint = "URLid peavad olema eraldatud koma või semikooloniga, nt: http://localhost:8080, http://192.168.1.1";
const urlsPlaceholder = "http://localhost:8080, http://192.168.1.1";
const savingTooltip = "Salvestamine võib aega võtta, sest kontrollitakse iga aadressi.";
const restoringTooltip = "Taasta seisund enne viimast salvestamist";
const subnetLabel = "IP aadress subnettiga";
const subnetPlaceholder = "192.168.1.0/24";
const portLabel = "Port";
const portPlaceholder = "8080";
const portHint = "Positiivne arv. Kohustuslik";

const subnetRules = [
  (v: string) => !!v || 'Väli on kohustuslik',
  (v: string) => {
    const [ip, mask] = v.split('/');
    const maskLength = parseInt(mask);
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(v)) {
      return 'Vigane subnet. Peab olema kujul "xxx.xxx.xxx.xxx/xx"';
    }
    if (24 > maskLength || maskLength > 31) {
      return 'Vigane subneti mask. Peab olema vahemikus 24-31';
    }
    const ipParts = ip.split('.');
    if (ipParts.length !== 4) {
      return 'Vigane IP aadress. Peab olema kujul "xxx.xxx.xxx.xxx"';
    }
    for (let part of ipParts) {
      if (parseInt(part) < 0 || parseInt(part) > 255) {
        return 'Vigane IP aadress osa. Peab olema vahemikus 0-255';
      }
    }
    return true;
  }
];
const portRules = [
  (v: string) => {
    if (v === '' || !v) return "Port on kohustuslik";
    const port = parseInt(v);
    if (0 > port) {
      return 'Port peab olema positiivne arv';
    }
    return true;
  }
];

function makeIpAddressesFromSubnet() {
  if (!subnet.value || !port.value
    || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(subnet.value)
    || !/^\d+$/.test(port.value)
  ) {
    alert('Vigane subnet ja/või port');
    return;
  }
  const ips = [];
  const [ip, mask] = subnet.value.split('/');
  const maskLength = parseInt(mask);
  const ipParts = ip.split('.');
  const ipBase = ipParts[0] + "." + ipParts[1] + "." + ipParts[2];
  const ipStart = parseInt(ipParts[3]);
  const ipEnd = Math.pow(2, 8 - maskLength % 8) + ipStart;

  for (let i = ipStart; i < ipEnd; i++) {
    ips.push(`http://${ipBase}.${i}:${port.value}`);
  }
  if (ipAddresses.value) {
    ipAddresses.value += ', ' + ips.join(', ');
  } else {
    ipAddresses.value = ips.join(', ');
  }
}

async function saveIpAddresses() {
  loading.value = true;
  lastIpAddresses.value = ipAddresses.value;
  const urls = ipAddresses.value.split(/[,;]/).map(url => url.trim()).filter(Boolean);
  const uniqueUrls = Array.from(new Set(urls));
  uniqueUrls.forEach((url, index) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      uniqueUrls[index] = 'http://' + url;
    }
  });
  const testPromises = uniqueUrls.map(url => mainStore.testURL(url));
  const results = await Promise.all(testPromises);
  const workingURLs = uniqueUrls.filter((url, index) => results[index]);
  ipAddresses.value = workingURLs.join(', ');
  mainStore.urls = workingURLs;
  loading.value = false;

  if (workingURLs.length === 0) {
    alert('Ükski URL ei tööta. Kontrolli, et aadressid oleksid õiged.')
  } else if (workingURLs.length < uniqueUrls.length) {
    alert('Mõni URL ei töödanud. Kontrolli, et aadressid oleksid õiged.');
  } else {
    alert('URL-id salvestatud');
  }
  await mainStore.fetchForAllUrls();
}

function restoreIpAddresses() {
  ipAddresses.value = lastIpAddresses.value;
  lastIpAddresses.value = '';
}

onMounted(() => {
  ipAddresses.value = mainStore.urls.join(', ');
});
</script>
