
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkspaceRequest, getCurrentWorkspaceRequest, inviteUser, postWorkspaceRequest, removeWorkspaceUser, deleteWorkspaceRequest, updateWorkspaceRequest } from './workspace.service';
import { AuthUser } from '@/entities/auth';
import { BaseWorkspaceType, WorkspaceListType, WorkspaceType } from '../types/workspace.type';

export const createWorkspaceThunk = createAsyncThunk<
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

export const fetchWorkspacesThunk = createAsyncThunk<
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

export const fetchCurrentWorkspaceThunk = createAsyncThunk<
  WorkspaceType,
  void,
  { rejectValue: string }
>('workspace/getCurrent', async (_, { rejectWithValue }) => {
  try {
    const res = await getCurrentWorkspaceRequest();
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const removeWorkspaceUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('workspace/removeUser', async (userId, { rejectWithValue }) => {
  try {
    await removeWorkspaceUser(userId);
    return userId;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const deleteWorkspaceThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('workspace/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteWorkspaceRequest(id);
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const updateWorkspaceThunk = createAsyncThunk<
  WorkspaceListType,
  { id: string; data: BaseWorkspaceType },
  { rejectValue: string }
>('workspace/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateWorkspaceRequest(id, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const inviteUserThunk = createAsyncThunk<
  AuthUser[],
  { emails: string[] },
  { rejectValue: string }
>('workspace/inviteUser', async (data, { rejectWithValue }) => {
  try {
    const res = await inviteUser(data);
    return res.data.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
