<template>
  <div class="section__auth">
    <v-form ref="form">
      <v-text-field
        class="mb-4"
        v-model="email"
        variant="outlined"
        :counter="12"
        :rules="[(v) => !!v || 'Enter email']"
        label="Email"
        required
      ></v-text-field>

      <div class="section__auth__password">
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          variant="outlined"
          :counter="18"
          :rules="[(v) => !!v || 'Enter password']"
          label="Password"
          required
        >
          <template v-slot:append>
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="section__auth__password__action"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </template>
        </v-text-field>
      </div>
    </v-form>

    <div class="section__auth__submit">
      <v-btn class="section__auth__submit__btn" :loading="loading" block @click="validate">
        Log In
      </v-btn>
      <div class="section__auth__submit__link">Forgot your password?</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const email = ref<string>('emilys')
    const password = ref<string>('emilyspass')
    const showPassword = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const form = ref<any>(null)
    const authStore = useAuthStore()
    const router = useRouter()

    const validate = async () => {
      const { valid } = await form.value.validate()
      if (valid) {
        loading.value = true
        try {
          const response = await authStore.login(email.value, password.value)
          console.log(response)
          router.push('/feed')
        } catch (error) {
          console.error('Login failed', error)
        } finally {
          loading.value = false
        }
      }
    }

    return {
      email,
      password,
      form,
      validate,
      showPassword,
      loading
    }
  }
})
</script>
