import axios from 'axios'

export const BASE_URL = 'https://api.themoviedb.org/3'
export const API_KEY = 'f342503e05811b9bde208a8cdbc7d3d0'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: API_KEY }
  return config
})
