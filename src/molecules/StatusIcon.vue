<template>
  <v-icon
    v-if="status"
    icon="mdi-check-circle"
    color="primary"
  ></v-icon>
  <v-icon
    v-else
    icon="mdi-close-circle"
    color="accent"
  ></v-icon>
</template>

<script setup lang="ts">
defineProps<{
  status: boolean;
}>();
</script>
