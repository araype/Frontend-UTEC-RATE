import axios, { type InternalAxiosRequestConfig } from 'axios'

const ms1 = axios.create({
  baseURL: import.meta.env.VITE_MS1_URL ?? 'http://localhost:3001',
})

const ms2 = axios.create({
  baseURL: import.meta.env.VITE_MS2_URL ?? 'http://localhost:3002',
})

const ms3 = axios.create({
  baseURL: import.meta.env.VITE_MS3_URL ?? 'http://localhost:3003',
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

ms1.interceptors.request.use(authInterceptor)
ms2.interceptors.request.use(authInterceptor)
ms3.interceptors.request.use(authInterceptor)

export { ms1, ms2, ms3 }
