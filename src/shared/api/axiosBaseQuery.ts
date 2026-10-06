import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { http } from '@/shared/api/http' // путь поправь под свой реальный файл

type AxiosBaseQueryArgs = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
    async ({ url, method, data, params }) => {
      try {
        const result = await http.request({ url, method, data, params })
        return { data: result.data }
      } catch (axiosError) {
        const err = axiosError as AxiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data ?? err.message,
          },
        }
      }
    }
