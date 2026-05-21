
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseSavingAccountType, SavingAccountType } from '../types/saving_account.type';
import { deleteSavingRequest, getAllSavingRequest, postSavingRequest } from './saving-account.service';

export const postSavingThunk = createAsyncThunk<
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

export const getAllSavingThunk = createAsyncThunk<
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

export const deleteSavingThunk = createAsyncThunk<
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
