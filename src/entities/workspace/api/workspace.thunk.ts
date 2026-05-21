
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkspaceRequest, postWorkspaceRequest } from './workspace.service';
import { BaseWorkspaceType, WorkspaceListType } from '../types/workspace.type';

export const postWorkspaceThunk = createAsyncThunk<
  WorkspaceListType,
  BaseWorkspaceType,
  { rejectValue: string }
>('workspace/create', async (data, { rejectWithValue }) => {
  try {
    const res = await postWorkspaceRequest(data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const getAllWorkspaceThunk = createAsyncThunk<
  WorkspaceListType[],
  void,
  { rejectValue: string }
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
