<template>
  <div style="margin: 0 auto; max-width: 600px">
    <v-card class="main__layout" max-width="600" style="height: calc(100vh - 56px)">
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
        <BottomNavigation />
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import TopNavigation from '@/components/TopNavigation.vue'
</script>
