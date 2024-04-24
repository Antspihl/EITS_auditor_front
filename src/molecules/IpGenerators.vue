<template>
  <h5>IP aadresside generaatorid</h5>
  <v-row>
    <v-col>
      <v-text-field
        :label=ipv4SubnetLabel
        :placeholder=ipv4SubnetPlaceholder
        v-model="ipv4Subnet"
        :rules="v4subnetRules"
        clearable
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        :label=ipv4PortLabel
        v-model="ipv4Port"
        :placeholder=ipv4PortPlaceholder
        :hint=ipv4PortHint
        :rules="portRules"
        type="number"
        hide-spin-buttons
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mt-2"
        color="info"
        @click="makeIPv4sFromSubnet"
      >
        Genereeri IPv4-d
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field
        :label=ipv6SubnetLabel
        :placeholder=ipv6SubnetPlaceholder
        v-model="ipv6Subnet"
        :rules="v6subnetRules"
        clearable
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        :label=ipv6PortLabel
        v-model="ipv6Port"
        :placeholder=ipv6PortPlaceholder
        :hint=ipv6PortHint
        :rules="portRules"
        type="number"
        hide-spin-buttons
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mt-2"
        color="info"
        @click="makeIPv6sFromSubnet"
      >
        Genereeri IPv6-d
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMainStore} from "@/api/MainStore";

const mainStore = useMainStore();

const ipv4Subnet = ref<string>();
const ipv4Port = ref<string>();

const ipv6Subnet = ref<string>();
const ipv6Port = ref<string>();

const ipv4SubnetLabel = "IPv4 aadress subnettiga";
const ipv4SubnetPlaceholder = "192.168.1.0/24";
const ipv4PortLabel = "Port";
const ipv4PortPlaceholder = "8080";
const ipv4PortHint = "Positiivne arv. Kohustuslik";

const ipv6SubnetLabel = "IPv6 aadress subnettiga";
const ipv6SubnetPlaceholder = "2001:0db8:85a3:::8a2e:0370:7334/6";
const ipv6PortLabel = "Port";
const ipv6PortPlaceholder = "8080";
const ipv6PortHint = "Positiivne arv. Kohustuslik";

const v4subnetRules = [
  (v: string) => !!v || 'Väli on kohustuslik',
  (v: string) => {
    const [ip, mask] = v.split('/');
    const maskLength = parseInt(mask);
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(v)) {
      return 'Vigane subnet. Peab olema kujul "xxx.xxx.xxx.xxx/xx"';
    }
    if (24 > maskLength || maskLength > 31) {
      return 'Vigane subneti mask. Peab olema vahemikus 24-31. Hetkel on ' + maskLength;
    }
    const ipParts = ip.split('.');
    if (ipParts.length !== 4) {
      return 'Vigane IP aadress. Peab olema kujul "xxx.xxx.xxx.xxx"';
    }
    for (let part of ipParts) {
      if (parseInt(part) < 0 || parseInt(part) > 255) {
        return 'Vigane IP aadressi osa {' + part + '}. Peab olema vahemikus 0-255';
      }
    }
    return true;
  }
];
const v6subnetRules = [
  (v: string) => !!v || 'Väli on kohustuslik',
  (v: string) => {
    const mask = v.split('/')[1];
    const maskLength = parseInt(mask);
    if (!/^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\/\d{1,3}$/.test(v)) {
      return 'Vigane subnet. Näidiseid: "2001:1:2:::5:6:0/120", "2001:0db8:85a3:::8a2e:0370:7334/127"';
    }
    if (120 > maskLength || maskLength > 127) {
      return 'Vigane subneti mask. Peab olema vahemikus 120-127. Hetkel on ' + maskLength;
    }
    return true;
  }
]
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

function makeIPv4sFromSubnet() {
  if (!ipv4Subnet.value || !ipv4Port.value
    || !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(ipv4Subnet.value)
    || !/^\d+$/.test(ipv4Port.value)
  ) {
    alert('Vigane subnet ja/või port');
    return;
  }
  const ips = [];
  const [ip, mask] = ipv4Subnet.value.split('/');
  const maskLength = parseInt(mask);
  const ipParts = ip.split('.');
  const ipBase = ipParts[0] + "." + ipParts[1] + "." + ipParts[2];
  const ipStart = parseInt(ipParts[3]);
  const ipEnd = Math.pow(2, 8 - maskLength % 8) + ipStart;

  for (let i = ipStart; i < ipEnd; i++) {
    ips.push(`http://${ipBase}.${i}:${ipv4Port.value}`);
  }
  if (mainStore.urlString) {
    mainStore.urlString += ', ' + ips.join(', ');
  } else {
    mainStore.urlString = ips.join(', ');
  }
}

function makeIPv6sFromSubnet() {
  if (!ipv6Subnet.value || !ipv6Port.value
    || !/^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\/\d{1,3}$/.test(ipv6Subnet.value)
    || !/^\d+$/.test(ipv6Port.value)
  ) {
    alert('Vigane subnet ja/või port');
    return;
  }
  const ips = [];
  const [ip, mask] = ipv6Subnet.value.split('/');
  const maskLength = parseInt(mask);
  const ipParts = ip.split(':');
  const ipBase = ipParts.slice(0, 7).join(':');
  const ipStart = parseInt(ipParts[7], 16);
  const ipEnd = Math.pow(2, 16 - maskLength % 16) + ipStart;

  for (let i = ipStart; i < ipEnd; i++) {
    ips.push(`http://[${ipBase}:${i.toString(16)}]:${ipv6Port.value}`);
  }
  if (mainStore.urlString) {
    mainStore.urlString += ', ' + ips.join(', ');
  } else {
    mainStore.urlString = ips.join(', ');
  }
}
</script>
