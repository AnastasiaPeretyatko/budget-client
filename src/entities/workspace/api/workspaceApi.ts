import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { AuthUser } from '@/entities/auth';
import { BaseWorkspaceType, WorkspaceListType, WorkspaceType } from '../types/workspace.type';

// Заголовок X-Workspace-Id берётся из localStorage в http.ts, а в ключ кэша он не входит —
// поэтому при смене пространства и выходе кэш сбрасывается целиком (см. app/resetApiCache)
export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  tagTypes: ['Workspace'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getWorkspaces: build.query<WorkspaceListType[], void>({
      query: () => ({ url: '/workspace', method: 'GET' }),
      providesTags: [{ type: 'Workspace', id: 'LIST' }],
    }),
    getCurrentWorkspace: build.query<WorkspaceType, void>({
      query: () => ({ url: '/workspace/current', method: 'GET' }),
      providesTags: [{ type: 'Workspace', id: 'CURRENT' }],
    }),
    createWorkspace: build.mutation<WorkspaceListType, BaseWorkspaceType>({
      query: (data) => ({ url: '/workspace', method: 'POST', data }),
      invalidatesTags: [{ type: 'Workspace', id: 'LIST' }],
    }),
    updateWorkspace: build.mutation<WorkspaceListType, { id: string, data: BaseWorkspaceType }>({
      query: ({ id, data }) => ({ url: `/workspace/${id}`, method: 'PATCH', data }),
      invalidatesTags: [{ type: 'Workspace', id: 'LIST' }, { type: 'Workspace', id: 'CURRENT' }],
    }),
    deleteWorkspace: build.mutation<void, string>({
      query: (id) => ({ url: `/workspace/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Workspace', id: 'LIST' }],
    }),
    inviteUser: build.mutation<{ message: string, data: AuthUser[] }, { emails: string[] }>({
      query: (data) => ({ url: '/workspace/invite', method: 'POST', data }),
      invalidatesTags: [{ type: 'Workspace', id: 'CURRENT' }],
    }),
    removeWorkspaceUser: build.mutation<void, string>({
      query: (userId) => ({ url: `/workspace/users/${userId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Workspace', id: 'CURRENT' }],
    }),
  })
})

export const {
  useGetWorkspacesQuery,
  useGetCurrentWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useInviteUserMutation,
  useRemoveWorkspaceUserMutation
} = workspaceApi
