
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseSavingAccountType, SavingAccountType } from '../types/saving-account.type';
import { deleteSavingRequest, getAllSavingRequest, getSavingByIdRequest, postSavingRequest } from './saving-account.service';

export const createSavingAccountThunk = createAsyncThunk<
  SavingAccountType,
  BaseSavingAccountType,
  { rejectValue: string }
>('saving/create', async (data, { rejectWithValue }) => {
  try {
    const res = await postSavingRequest(data);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const fetchSavingAccountsThunk = createAsyncThunk<
  SavingAccountType[],
  void,
  { rejectValue: string }
>('saving/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllSavingRequest();
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const fetchSavingAccountByIdThunk = createAsyncThunk<
  SavingAccountType,
  string,
  { rejectValue: string }
>('saving/getById', async (id, { rejectWithValue }) => {
  try {
    const res = await getSavingByIdRequest(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const deleteSavingAccountThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('saving/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteSavingRequest(id);
    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});
