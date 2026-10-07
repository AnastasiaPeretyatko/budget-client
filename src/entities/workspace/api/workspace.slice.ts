import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorkspaceState = {
  activeWorkspaceId: string | null
}

const initialState: WorkspaceState = {
  activeWorkspaceId: null,
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
  }
})

export const { setActiveWorkspace, clearActiveWorkspace } = workspaces.actions

export default workspaces.reducer;
