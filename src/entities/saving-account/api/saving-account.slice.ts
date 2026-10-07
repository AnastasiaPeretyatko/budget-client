import { createSlice } from '@reduxjs/toolkit'
import { SavingAccountType } from '../types/saving-account.type'
import { fetchSavingAccountsThunk } from './saving-account.thunk'

type SavingAccountState = {
  savingAccounts: SavingAccountType[]
  isLoading: boolean
  error?: string
}

const initialState: SavingAccountState = {
  savingAccounts: [],
  isLoading: false
}

const savingAccountSlice = createSlice({
  name: 'savingAccounts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSavingAccountsThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchSavingAccountsThunk.fulfilled, (state, { payload }) => {
        state.savingAccounts = payload
        state.isLoading = false
      })
      .addCase(fetchSavingAccountsThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
  }
})

export default savingAccountSlice.reducer;
