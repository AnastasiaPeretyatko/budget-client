import { http } from '@/shared/api';
import { AxiosResponse } from 'axios';
import { UpdateUserDto, UserProfile } from '../types/user.type';

export const getMeRequest = (): Promise<AxiosResponse<UserProfile>> => http.get('/auth/me')

export const updateMeRequest = (data: UpdateUserDto): Promise<AxiosResponse<UserProfile>> => http.patch('/users/me', data)
