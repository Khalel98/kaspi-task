<template>
  <div>
    <div class="section__loader" v-if="loading">
      <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
    </div>
    <div class="section__content" v-else-if="post">
      <div class="section__content__banner">
        <img v-if="post.img" :src="post.img" alt="" class="section__content__img" />
      </div>
      <h2 class="section__content__title">{{ post.title }}</h2>
      <h5 class="section__content__author">Author</h5>
      <p class="section__content__body">{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'

export default {
  setup() {
    const postsStore = usePostsStore()
    const route = useRoute()

    const post = computed(() => postsStore.post)
    const loading = computed(() => postsStore.loading)

    const fetchPost = async () => {
      await postsStore.fetchPost(route.params.id)
    }

    onMounted(() => {
      fetchPost()
    })

    return {
      post,
      loading
    }
  }
}
</script>
