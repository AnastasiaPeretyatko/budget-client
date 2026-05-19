import { http } from '@/common/services.config';
import { AxiosResponse } from 'axios';
import { AuthUser } from '../types/user.type';

export type LoginRequest = {
  user: AuthUser,
  token: string
  refreshToken: string
}

export const loginRequest = (data: { email: string; password: string }): Promise<AxiosResponse<LoginRequest>> => http.post('/auth/login', data)
