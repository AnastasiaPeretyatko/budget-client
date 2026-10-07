import { createSlice } from '@reduxjs/toolkit';
import { UserProfile } from '../types/user.type';
import { fetchMeThunk, updateMeThunk } from './user.thunk';

type UserState = {
  profile: UserProfile | null;
  isLoading: boolean;
  error?: string;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMeThunk.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchMeThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;
      })
      .addCase(fetchMeThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(updateMeThunk.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateMeThunk.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;
      })
      .addCase(updateMeThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
  }
});

export default userSlice.reducer;
