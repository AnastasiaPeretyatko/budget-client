import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchWorkspacesThunk, createWorkspaceThunk } from './workspace.thunk'
import { WorkspaceListType } from '../types/workspace.type'

type WorkspaceState = {
  workspaces: WorkspaceListType[]
  activeWorkspaceId: string | null
  isLoading: boolean
  error?: string
}

const initialState: WorkspaceState = {
  workspaces: [],
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
  }
})

export const { setActiveWorkspace, clearActiveWorkspace } = workspaces.actions

export default workspaces.reducer;
