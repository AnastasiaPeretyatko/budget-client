import { createSlice } from '@reduxjs/toolkit'
import { SavingAccountType } from '../types/saving_account.type'
import { deleteSavingThunk, getAllSavingThunk, postSavingThunk } from './saving-account.thunk'

type TInitialState = {
  saving: SavingAccountType[]
  isLoading: boolean
  error?: string
}

const initialState: TInitialState = {
  saving: [],
  isLoading: false
}

const saving = createSlice({
  name: 'saving',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllSavingThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(getAllSavingThunk.fulfilled, (state, { payload }) => {
        state.saving = payload
        state.isLoading = false
      })
      .addCase(getAllSavingThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(postSavingThunk.pending, state => {
        state.error = undefined
      })
      .addCase(postSavingThunk.fulfilled, (state, { payload }) => {
        state.saving.push(payload)
      })
      .addCase(postSavingThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(deleteSavingThunk.pending, state => {
        state.error = undefined
      })
      .addCase(deleteSavingThunk.fulfilled, (state, { payload }) => {
        state.saving = state.saving.filter(item => item.id !== payload)
      })
      .addCase(deleteSavingThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
  }
})

export default saving.reducer;
