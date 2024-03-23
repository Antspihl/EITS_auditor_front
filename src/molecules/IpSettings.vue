<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      IP-Aadressid
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-col>
            <v-text-field
              label="IP aadress subnettiga"
              placeholder="192.168.1.0/24"
              v-model="subnet"
              :rules="subnetRules"
              clearable
            />
        </v-col>
        <v-col
          cols="2"
        >
            <v-text-field
              label="Port"
              v-model="port"
              placeholder="8080"
              hint="Positiivne arv. Kohustuslik"
              :rules="portRules"
              type="number"
              hide-spin-buttons
            />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn
            color="info"
            @click="makeIpAddressesFromSubnet"
          >
            Genereeri IP-d
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-tooltip
            text="Salvestamine võib aega võtta, sest kontrollitakse igat aadressi."
            location="end"
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
      <v-row>
        <v-textarea
          label="Kontrollitavad IP-aadressid"
          hint="IP-d on komaga eraldatud, nt: localhost:8080, 192.168.1.1"
          v-model="ipAddresses"
          auto-grow
          clearable
        >
        </v-textarea>
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
const loading = ref(false);

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
  ) return;
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
  ipAddresses.value = ips.join(', ');
}

async function saveIpAddresses() {
  loading.value = true;
  const urls = ipAddresses.value.split(',').map(url => url.trim()).filter(Boolean);
  const testPromises = urls.map(url => mainStore.testURL(url));
  const results = await Promise.all(testPromises);
  const workingURLs = urls.filter((url, index) => results[index]);
  ipAddresses.value = workingURLs.join(', ');
  mainStore.urls = workingURLs;
  loading.value = false;
}

onMounted(() => {
  ipAddresses.value = mainStore.urls.join(', ');
});
</script>
