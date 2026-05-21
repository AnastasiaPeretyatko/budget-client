import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllWorkspaceThunk, postWorkspaceThunk } from './workspace.thunk'
import { WorkspaceListType } from '../types/workspace.type'

type TInitialState = {
  workspaces: WorkspaceListType[]
  activeWorkspaceId: string | null
  isLoading: boolean
  error?: string
}

const initialState: TInitialState = {
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
      .addCase(getAllWorkspaceThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(getAllWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.workspaces = payload
      })
      .addCase(getAllWorkspaceThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(postWorkspaceThunk.pending, state => {
        state.error = undefined
      })
      .addCase(postWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.workspaces.push(payload)
      })
      .addCase(postWorkspaceThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
  }
})

export const { setActiveWorkspace, clearActiveWorkspace } = workspaces.actions

export default workspaces.reducer;
