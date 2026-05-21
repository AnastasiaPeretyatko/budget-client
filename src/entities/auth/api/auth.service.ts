import { http } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { AuthUser } from '../types/user.type';

export type LoginResponse = {
  user: AuthUser,
  token: string
  refreshToken: string
}

export const loginRequest = (data: { email: string; password: string }): Promise<AxiosResponse<LoginResponse>> => http.post('/auth/login', data)
