
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseSavingAccountType, SavingAccountType } from '../types/saving_account.type';
import { deleteSavingRequest, getAllSavingRequest, postSavingRequest } from './saving-account.service';

export const postSavingThunk = createAsyncThunk<{data: SavingAccountType, message: string}, BaseSavingAccountType>('/saving.create', async (data) => {
  try {
    const res = await postSavingRequest(data);
    return {
      data: res.data,
      message: ''
    }
  } catch (error) {
    console.log(error)
  }
})

export const getAllSavingThunk = createAsyncThunk<
  SavingAccountType[],
  void
>('saving/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getAllSavingRequest();

    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteSavingThunk = createAsyncThunk<{id: string, message: string}, string>('/saving.delete', async (id) => {
  try {
    await deleteSavingRequest(id);
    return {
      id,
      message: ''
    }
  } catch (error) {
    console.log(error)
  }
})
