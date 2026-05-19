import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, loginRequest } from './auth.service';

export const loginThunk = createAsyncThunk<
LoginRequest,
{email: string, password: string},
{ rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginRequest(data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
