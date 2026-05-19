
import { createSlice } from '@reduxjs/toolkit'
import { SavingAccountType } from '../types/saving_account.type'
import { deleteSavingThunk, getAllSavingThunk, postSavingThunk } from './saving-account.thunk'

// export type TParams = {}

type TInitialState = {
  saving: SavingAccountType[]
}

const initialState: TInitialState = {
  saving: [],
}

const saving = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(postTransactionThunk.pending, state => {})
      // .addCase(postTransactionThunk.fulfilled, (state, { payload }) => {
      //   // state.transaction.push(payload.data)
      // })
      .addCase(getAllSavingThunk.fulfilled, (state, { payload }) => {
        state.saving = payload
      })
      .addCase(postSavingThunk.fulfilled, (state, { payload }) => {
        state.saving.push(payload.data)
      })
      .addCase(deleteSavingThunk.fulfilled, (state, { payload }) => {
        state.saving = state.saving.filter(item => item.id !== payload.id)
      })
  }
})

export default saving.reducer;
