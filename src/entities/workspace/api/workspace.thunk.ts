
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkspaceRequest, postWorkspaceRequest } from './workspace.service';
import { BaseWorkspaceType, WorkspaceType } from '../types/workspace.type';

export const postWorkspaceThunk = createAsyncThunk<
  {data: WorkspaceType, message: string},
  BaseWorkspaceType,
  { rejectValue: string }
>('/workspace.create', async (data, { rejectWithValue }) => {
  try {
    console.log({ data });
    const res = await postWorkspaceRequest(data);
    return {
      data: res.data,
      message: ''
    }
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
})

export const getAllWorkspaceThunk = createAsyncThunk<
  WorkspaceType[],
  void
>('workspace/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllWorkspaceRequest();

    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
