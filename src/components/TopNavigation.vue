<template>
  <div :class="['section__header', { profile: isProfile }]">
    <div class="section__header__back">
      <router-link v-if="backLink" class="section__header__link" :to="backLink">{{
        backTitle
      }}</router-link>
      <div v-else class="section__header__link">
        {{ backTitle }}
      </div>
    </div>
    <div class="section__header__title">
      {{ title }}
    </div>
    <div class="section__header__forward">
      <router-link v-if="forwardLink" class="section__header__link" :to="forwardLink">{{
        forwardTitle
      }}</router-link>
      <div v-else class="section__header__link">
        {{ forwardTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    backLink: String,
    backTitle: String,
    forwardLink: String,
    forwardTitle: String,
    isProfile: Boolean
  }
}
</script>
