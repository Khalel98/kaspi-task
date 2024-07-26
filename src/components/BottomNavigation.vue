<template>
  <v-bottom-navigation max-width="600" color="indigo">
    <div class="navigation__bottom">
      <router-link to="/feed" class="navigation__bottom__navigation" active-class="active">
        <v-icon>mdi-home-variant</v-icon>
      </router-link>
      <router-link to="/profile" class="navigation__bottom__navigation" active-class="active">
        <v-icon>mdi mdi-account</v-icon>
      </router-link>
      <router-link to="/market" class="navigation__bottom__navigation" active-class="active">
        <v-icon>mdi-list-box</v-icon>
      </router-link>
      <div class="navigation__bottom__navigation" @click="logout">
        <v-icon>mdi mdi-logout</v-icon>
      </div>
    </div>
  </v-bottom-navigation>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

function logout() {
  authStore.clearAuthData()
}
</script>
