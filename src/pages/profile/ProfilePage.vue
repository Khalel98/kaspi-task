<template>
  <div class="section__profile">
    <div class="section__profile__header">
      <img :src="user.image" alt="" class="section__profile__header__img" />
    </div>

    <div class="section__profile__content">
      <h2 class="section__profile__name">{{ user.firstName }} {{ user.lastName }}</h2>
      <h4 class="section__profile__email">{{ user.email }}</h4>

      <SwitchButton v-model="switchModel" @input="changeStatus" />

      <div v-if="!switchModel">
        <div class="section__loader" v-if="loading">
          <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
        </div>
        <div v-else class="section__feed__column">
          <div
            v-for="post in posts"
            :key="post.id"
            class="section__feed__item"
            @click="$router.push(`post/${post.id}`)"
          >
            <img v-if="post.img" :src="post.img" alt="" class="section__feed__item__img" />
            <div v-else class="section__feed__item__banner"></div>
            <div class="section__feed__item__content">
              <div class="section__feed__item__content__header">
                <div class="section__feed__item__content__title">{{ post.title }}</div>
                <div class="section__feed__item__content__date">8m ago</div>
              </div>
              <div class="section__feed__item__content__body">
                {{ truncateText(post.body) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { usePostsStore } from '@/stores/posts'
import SwitchButton from '@/components/SwitchButton.vue'

export default defineComponent({
  name: 'ProfilePage',
  components: {
    SwitchButton
  },
  setup() {
    const authStore = useAuthStore()
    const postsStore = usePostsStore()
    const user = authStore.user
    const switchModel = ref(false)

    const posts = computed(() => postsStore.posts)
    const loading = computed(() => postsStore.loading)

    const truncateText = (text, length = 100) => {
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    const changeStatus = (val) => {
      switchModel.value = val
      if (!val) {
        postsStore.fetchUserPosts(user.id)
      }
    }

    onMounted(() => {
      if (user && user.id) {
        postsStore.fetchUserPosts(user.id)
      }
    })

    return {
      user,
      posts,
      loading,
      switchModel,
      changeStatus,
      truncateText
    }
  }
})
</script>
