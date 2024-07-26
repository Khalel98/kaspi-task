import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
import router from '@/router'
import type { User } from '@/types/userType'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    user: (JSON.parse(localStorage.getItem('user') || '{}') as User) || null
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
    },
    setUser(user: User) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    clearAuthData() {
      this.token = ''
      this.refreshToken = ''
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      router.push('/login')
    },
    async login(username: string, password: string) {
      try {
        const response = await axiosInstance.post('auth/login', {
          username,
          password,
          expiresInMins: 30
        })

        const { token, refreshToken, ...user } = response.data

        this.setToken(token)
        this.setRefreshToken(refreshToken)
        this.setUser(user as User)
        return response.data
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async refreshAccessToken() {
      const refreshToken = this.refreshToken

      if (refreshToken) {
        try {
          const response = await axiosInstance.post('auth/refresh', {
            refreshToken,
            expiresInMins: 30
          })

          const { token, refreshToken: newRefreshToken } = response.data

          this.setToken(token)
          this.setRefreshToken(newRefreshToken)

          return response.data
        } catch (error) {
          console.error('Failed to refresh access token', error)
          this.clearAuthData()
          router.push('/login')
          throw error
        }
      } else {
        this.clearAuthData()
        router.push('/login')
      }
    }
  }
})
