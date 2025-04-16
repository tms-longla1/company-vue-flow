import axios, { AxiosError, HttpStatusCode } from 'axios'
import { clearAccessTokenFromLocalStorage, getAccessTokenFromLocalStorage } from './localStorage'

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/manager`,
  timeout: 1000 * 60,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
})

http.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenFromLocalStorage()
    if (accessToken && config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`
    }
    config.headers['ngrok-skip-browser-warning'] = '69420'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (
      response.data.code === HttpStatusCode.InternalServerError &&
      response.data.code === HttpStatusCode.Unauthorized
    ) {
      clearAccessTokenFromLocalStorage()
      window.location.href = '/login'
    }
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default http
