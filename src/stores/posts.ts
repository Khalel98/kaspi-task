import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
import type { Post, State } from '@/types/postType'

export const usePostsStore = defineStore('posts', {
  state: (): State => ({
    posts: [],
    post: null,
    loading: false,
    query: ''
  }),
  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await axiosInstance.get<{ posts: Post[] }>(`posts/search?q=${this.query}`)
        this.posts = response.data.posts || []
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchUserPosts(userId: number) {
      this.loading = true
      try {
        const response = await axiosInstance.get<{ posts: Post[] }>(`posts/user/${userId}`)
        this.posts = response.data.posts || []
      } catch (error) {
        console.error('Error fetching user posts:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchPost(id: number) {
      this.loading = true
      try {
        const response = await axiosInstance.get<Post>(`posts/${id}`)
        this.post = response.data || null
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        this.loading = false
      }
    },
    setQuery(query: string) {
      this.query = query
    }
  }
})
