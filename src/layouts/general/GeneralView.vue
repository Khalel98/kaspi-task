<template>
  <v-card class="mx-auto" max-width="600" style="height: 100vh">
    <v-layout>
      <v-app-bar>
        <TopNavigation
          :title="$route.meta.title"
          :backLink="$route.meta.backLink"
          :backTitle="$route.meta.backTitle"
          :forwardLink="$route.meta.forwardLink"
          :forwardTitle="$route.meta.forwardTitle"
          :isProfile="$route.meta.profile"
        />
      </v-app-bar>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import TopNavigation from '@/components/TopNavigation.vue'
</script>
