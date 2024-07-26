import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

// Исходник
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000
})

// Добавить запрос в интерсептор
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const authStore = useAuthStore()

    if (error.response && error.response.status === 401) {
      // Обновлять токен
      const refreshToken = authStore.refreshToken

      if (refreshToken) {
        try {
          const response = await axios.post('https://dummyjson.com/auth/refresh', {
            refreshToken,
            expiresInMins: 30
          })

          const { token, refreshToken: newRefreshToken } = response.data

          authStore.setToken(token)
          authStore.setRefreshToken(newRefreshToken)

          error.config.headers.Authorization = `Bearer ${token}`
          return axiosInstance(error.config)
        } catch (refreshError) {
          authStore.clearAuthData()
          router.push('/login')
          return Promise.reject(refreshError)
        }
      } else {
        authStore.clearAuthData()
        router.push('/login')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
