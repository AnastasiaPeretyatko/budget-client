import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMeRequest, updateMeRequest } from './user.service';
import { UpdateUserDto, UserProfile } from '../types/user.type';

export const fetchMeThunk = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>('user/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const res = await getMeRequest();
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const updateMeThunk = createAsyncThunk<
  UserProfile,
  UpdateUserDto,
  { rejectValue: string }
>('user/updateMe', async (data, { rejectWithValue }) => {
  try {
    const res = await updateMeRequest(data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
