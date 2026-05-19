
import { createSlice } from '@reduxjs/toolkit'
import { getAllWorkspaceThunk, postWorkspaceThunk } from './workspace.thunk'
import { WorkspaceListType } from '../types/workspace.type'

type TInitialState = {
  workspaces: WorkspaceListType[]
  isLoading: boolean
}

const initialState: TInitialState = {
  workspaces: [],
  isLoading: false
}

const workspaces = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllWorkspaceThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.workspaces = payload
      })
      .addCase(getAllWorkspaceThunk.rejected, (state, { payload }) => {
        state.isLoading = false
      })
      .addCase(postWorkspaceThunk.fulfilled, (state, { payload }) => {
        state.workspaces.push(payload.data)
      })
      // .addCase(postWorkspaceThunk.pending, state => {})
      // .addCase(postWorkspaceThunk.rejected, (state, { payload }) => {})
  }
})

export default workspaces.reducer;
