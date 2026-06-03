import { http } from '@/shared/api';
import { BaseWorkspaceType, WorkspaceListType, WorkspaceType } from '../types/workspace.type';
import { AxiosResponse } from 'axios';

export const getAllWorkspaceRequest = (): Promise<AxiosResponse<WorkspaceListType[]>> => http.get('/workspace')

export const getCurrentWorkspaceRequest = (): Promise<AxiosResponse<WorkspaceType>> => http.get('/workspace/current')

export const postWorkspaceRequest = ({ title }: BaseWorkspaceType): Promise<AxiosResponse<WorkspaceListType>> => http.post('/workspace', { title })

import { AuthUser } from '@/entities/auth';

export const inviteUser = ({ emails }: {emails: string[]}): Promise<AxiosResponse<{ message: string, data: AuthUser[] }>> => http.post('/workspace/invite', { emails })
