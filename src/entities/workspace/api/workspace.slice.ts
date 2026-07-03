import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchWorkspacesThunk, createWorkspaceThunk, fetchCurrentWorkspaceThunk, inviteUserThunk, removeWorkspaceUserThunk, deleteWorkspaceThunk, updateWorkspaceThunk } from './workspace.thunk'
import { WorkspaceListType, WorkspaceType } from '../types/workspace.type'

type WorkspaceState = {
  workspaces: WorkspaceListType[]
  currentWorkspace: WorkspaceType | null
  activeWorkspaceId: string | null
  isLoading: boolean
  error?: string
}

const initialState: WorkspaceState = {
  workspaces: [],
  currentWorkspace: null,
  activeWorkspaceId: null,
  isLoading: false
}

const workspaces = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    setActiveWorkspace: (state, { payload }: PayloadAction<string>) => {
      state.activeWorkspaceId = payload
    },
    clearActiveWorkspace: (state) => {
      state.activeWorkspaceId = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWorkspacesThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchWorkspacesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.workspaces = payload
      })
      .addCase(fetchWorkspacesThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(createWorkspaceThunk.pending, state => {
        state.error = undefined
      })
      .addCase(createWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.workspaces.push(payload)
      })
      .addCase(createWorkspaceThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(fetchCurrentWorkspaceThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCurrentWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.currentWorkspace = payload
      })
      .addCase(fetchCurrentWorkspaceThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(inviteUserThunk.fulfilled, (state, { payload }) => {
        if (state.currentWorkspace) {
          state.currentWorkspace.users = [...state.currentWorkspace.users, ...payload]
        }
      })
      .addCase(inviteUserThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(removeWorkspaceUserThunk.fulfilled, (state, { payload }) => {
        if (state.currentWorkspace) {
          state.currentWorkspace.users = state.currentWorkspace.users.filter(u => u.id !== payload)
        }
      })
      .addCase(deleteWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.workspaces = state.workspaces.filter(w => w.id !== payload)
      })
      .addCase(deleteWorkspaceThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(updateWorkspaceThunk.fulfilled, (state, { payload }) => {
        const idx = state.workspaces.findIndex(w => w.id === payload.id)
        if (idx !== -1) state.workspaces[idx] = payload
      })
      .addCase(updateWorkspaceThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
  }
})

export const { setActiveWorkspace, clearActiveWorkspace } = workspaces.actions

export default workspaces.reducer;
