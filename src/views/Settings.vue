<template>
  <v-container>
    <v-card>
      <v-card-title>
        Sätted
      </v-card-title>
      <v-expansion-panels variant="accordion">
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
