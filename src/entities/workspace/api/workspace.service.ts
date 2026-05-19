import { http } from '@/common/services.config';
import { BaseWorkspaceType, WorkspaceType } from '../types/workspace.type';
import { AxiosResponse } from 'axios';

export const getAllWorkspaceRequest = (): Promise<AxiosResponse<WorkspaceType[]>> => http.get('/workspace')

export const postWorkspaceRequest = ({ title }: BaseWorkspaceType): Promise<AxiosResponse<WorkspaceType>> => http.post('/workspace', { title })

