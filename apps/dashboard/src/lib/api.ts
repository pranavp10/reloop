import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios'

import env from '@/lib/env/client'

const api: AxiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_WEB_URL}/api`,
} satisfies AxiosRequestConfig)

export { api as default, axios, isAxiosError }
