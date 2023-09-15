import axios from 'axios'

const AxiosConfigure = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosPublic = axios.create(AxiosConfigure)

export default axiosPublic
