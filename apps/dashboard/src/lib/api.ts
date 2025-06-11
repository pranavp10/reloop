import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEB_URL}/api`,
} satisfies AxiosRequestConfig);

export { api as default, axios, isAxiosError };
