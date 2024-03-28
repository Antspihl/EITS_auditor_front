<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <h4>E-ITS audiitor</h4>
    </v-app-bar-title>
    <v-btn
      @click="router.push('/')"
      prepend-icon="mdi-home"
    >
      Meetmed
    </v-btn>
    <v-btn
      @click="router.push('/settings')"
      prepend-icon="mdi-cog"
    >
      Sätted
    </v-btn>
    <DownloadButton
    />
    <v-switch
      class="pr-16 pt-5 pl-4"
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
import {useRouter} from "vue-router";
import DownloadButton from "@/molecules/DownloadButton.vue";

const router = useRouter()
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
