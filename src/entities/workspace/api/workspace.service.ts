import { http } from '@/common/services.config';
import { BaseWorkspaceType, WorkspaceListType } from '../types/workspace.type';
import { AxiosResponse } from 'axios';

export const getAllWorkspaceRequest = (): Promise<AxiosResponse<WorkspaceListType[]>> => http.get('/workspace')

export const postWorkspaceRequest = ({ title }: BaseWorkspaceType): Promise<AxiosResponse<WorkspaceListType>> => http.post('/workspace', { title })

