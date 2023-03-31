import axios, { AxiosInstance } from 'axios'

export interface Result<T> {
  data: T,
  meta: {
    msg: string,
    status: number
  }
}

export interface Page<T> {
  total: number,
  list: T[]
}

export interface PageDto {
  pageNum: number,
  pageSize: number,

  sort?: string,
  desc?: boolean,
  key?: string
}

const request: AxiosInstance = axios.create({
    // @ts-ignore
    baseURL: import.meta.env.VITE_BASE_API,
    // @ts-ignore
    timeout: import.meta.env.VITE_TIMEOUT
  }
)

request.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    let data = response.data
    let code = data.code
    if (code < 200 || code >= 300) {
      if (code === 403) {
        ElMessage(
          {
            message: data.message,
            type: 'error'
          }
        )
        window.location.href = '/login'
      } else {
        ElMessage(
          {
            message: data.message,
            type: 'error'
          }
        )
      }
    } else {
      return data
    }
  }, (error) => {
    return Promise.reject(error)
  }
)

export default request
