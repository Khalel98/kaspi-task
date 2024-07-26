<template>
  <div class="section__auth">
    <v-form ref="form">
      <v-text-field
        class="mb-4"
        v-model="name"
        variant="outlined"
        :rules="[(v) => !!v || 'Enter name']"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        class="mb-4"
        v-model="email"
        variant="outlined"
        :rules="[(v) => /.+@.+\..+/.test(v) || 'Email must be valid', (v) => !!v || 'Enter email']"
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

      <v-checkbox v-model="checkbox" color="#5db075" :rules="[(v) => !!v || 'Confirm']" required>
        <template v-slot:label>
          <div class="section__auth__checkbox">
            I would like to receive your newsletter and other promotional information.
          </div>
        </template>
      </v-checkbox>
    </v-form>

    <div class="section__auth__submit">
      <v-btn class="section__auth__submit__btn" block @click="validate"> Sign Up </v-btn>
      <div class="section__auth__submit__link">Forgot your password?</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const email = ref<string>('')
    const name = ref<string>('')
    const password = ref<string>('')
    const showPassword = ref<boolean>(false)
    const checkbox = ref<boolean>(false)
    const form = ref<any>(null)

    const validate = async () => {
      const { valid } = await form.value.validate()
      if (valid) {
        alert('inDev')
      }
    }

    return {
      name,
      email,
      password,
      form,
      validate,
      showPassword,
      checkbox
    }
  }
})
</script>
