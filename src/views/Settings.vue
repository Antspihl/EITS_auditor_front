<template>
  <v-container>
    <v-card>
      <v-card-title>
        Seaded
      </v-card-title>
      <v-expansion-panels>
        <IpAddresses/>
        <MeasureSettings/>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">

import IpAddresses from "@/molecules/IpSettings.vue";
import MeasureSettings from "@/molecules/MeasureSettings.vue";
</script>
