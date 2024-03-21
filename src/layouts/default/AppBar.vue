<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <h3>E-ITS audiitor</h3>
    </v-app-bar-title>

    <v-btn
      class="mr-6"
      density="comfortable"
      icon="mdi-cog"
    >
    </v-btn>
    <v-switch
      class="pr-16 pt-5"
      v-model="isLight"
      @click="toggleTheme"
    >
      <template v-slot:prepend>
        <v-icon>mdi-theme-light-dark</v-icon>
      </template>
    </v-switch>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useTheme} from "vuetify";

const isLight = ref(false);
const theme = useTheme()

function toggleTheme() {
  if (isLight.value) {
    theme.global.name.value = 'dark'
    isLight.value = false
  } else {
    theme.global.name.value = 'light'
    isLight.value = true
  }
}
</script>
