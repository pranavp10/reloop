import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { publicEnv } from './env';

const api: AxiosInstance = axios.create({
  baseURL: `${publicEnv.NEXT_PUBLIC_WEB_URL}/api`,
} satisfies AxiosRequestConfig);

export { api as default, axios, isAxiosError };
