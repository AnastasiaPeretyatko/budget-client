import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthUser } from '../types/user.type';
import { LoginResponse, loginRequest, registerRequest, verifyTokenRequest } from './auth.service';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginRequest(data);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('refreshToken', res.data.refreshToken);

    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const verifyTokenThunk = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: 'unavailable' | 'unauthorized' }
>('auth/verify', async (_, { rejectWithValue }) => {
  try {
    const res = await verifyTokenRequest();
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      return rejectWithValue('unavailable');
    }
    return rejectWithValue('unauthorized');
  }
});

export const registerThunk = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await registerRequest(data);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('refreshToken', res.data.refreshToken);

    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
