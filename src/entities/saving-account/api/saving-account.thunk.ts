
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SavingAccountType } from '../types/saving-account.type';
import { getAllSavingRequest } from './saving-account.service';

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
