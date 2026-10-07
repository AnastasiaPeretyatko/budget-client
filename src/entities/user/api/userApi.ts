import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { UpdateUserDto, UserProfile } from '../types/user.type';

// Данные пользователя живут в auth.user (их загружает проверка токена при старте),
// поэтому здесь только изменение. После успеха вызывающий код обновляет auth.user через setUser.
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    updateMe: build.mutation<UserProfile, UpdateUserDto>({
      query: (data) => ({ url: '/users/me', method: 'PATCH', data }),
    }),
  })
})

export const { useUpdateMeMutation } = userApi
