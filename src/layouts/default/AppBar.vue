<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-row>
        <v-col
          cols="1"
          class="v-title"
        >
          <h4>E-ITS audiitor</h4>
        </v-col>
        <v-col
          class="align-self-auto"
        >
          <v-btn
            @click="router.push('/')"
          >
            <v-icon>
              mdi-home
            </v-icon>
            Meetmed
          </v-btn>
          <v-btn
            @click="router.push('/settings')"
          >
            <v-icon>
              mdi-cog
            </v-icon>
            Sätted
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar-title>
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
import {useRouter} from "vue-router";

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

<style>
.v-title {
  max-width: 130px;
  margin-top: 2px;
}
</style>
