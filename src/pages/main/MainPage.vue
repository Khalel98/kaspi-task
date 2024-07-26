<template>
  <div class="section__feed">
    <input
      class="section__feed__search"
      type="text"
      v-model="query"
      @keyup.enter="fetchPosts"
      placeholder="Search"
    />

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
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { usePostsStore } from '@/stores/posts'

export default defineComponent({
  name: 'FeedPage',
  setup() {
    const postsStore = usePostsStore()

    const posts = computed(() => postsStore.posts)
    const loading = computed(() => postsStore.loading)
    const query = computed({
      get: () => postsStore.query,
      set: (value: string) => {
        postsStore.setQuery(value)
      }
    })

    const fetchPosts = async () => {
      await postsStore.fetchPosts()
    }

    onMounted(() => {
      fetchPosts()
    })

    const truncateText = (text: string, length = 100): string => {
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    return {
      posts,
      loading,
      query,
      fetchPosts,
      truncateText
    }
  }
})
</script>
