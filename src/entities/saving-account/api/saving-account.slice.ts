import { createSlice } from '@reduxjs/toolkit'
import { SavingAccountType } from '../types/saving-account.type'
import { archiveSavingAccountThunk, deleteSavingAccountThunk, fetchSavingAccountByIdThunk, fetchSavingAccountsThunk, createSavingAccountThunk } from './saving-account.thunk'

type SavingAccountState = {
  savingAccounts: SavingAccountType[]
  activeSavingAccount: SavingAccountType | null
  isLoading: boolean
  error?: string
}

const initialState: SavingAccountState = {
  savingAccounts: [],
  activeSavingAccount: null,
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
      .addCase(createSavingAccountThunk.pending, state => {
        state.error = undefined
      })
      .addCase(createSavingAccountThunk.fulfilled, (state, { payload }) => {
        state.savingAccounts.push(payload)
      })
      .addCase(createSavingAccountThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(deleteSavingAccountThunk.pending, state => {
        state.error = undefined
      })
      .addCase(deleteSavingAccountThunk.fulfilled, (state, { payload }) => {
        state.savingAccounts = state.savingAccounts.filter(item => item.id !== payload)
      })
      .addCase(deleteSavingAccountThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(fetchSavingAccountByIdThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchSavingAccountByIdThunk.fulfilled, (state, { payload }) => {
        state.activeSavingAccount = payload
        state.isLoading = false
      })
      .addCase(fetchSavingAccountByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(archiveSavingAccountThunk.fulfilled, (state, { payload }) => {
        state.savingAccounts = state.savingAccounts.filter(item => item.id !== payload)
        if (state.activeSavingAccount?.id === payload) {
          state.activeSavingAccount = null
        }
      })
  }
})

export default savingAccountSlice.reducer;
