import { createSlice } from '@reduxjs/toolkit'
import { createCategoryThunk, fetchCategoriesThunk, updateCategoryThunk, archiveCategoryThunk } from './category.thunk'
import { CategoryType } from '../types/category.type'

type CategoryState = {
  categories: CategoryType[]
  isLoading: boolean
  error?: string
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoriesThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.categories = payload
      })
      .addCase(fetchCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(createCategoryThunk.fulfilled, (state, { payload }) => {
        state.categories.unshift(payload)
      })
      .addCase(updateCategoryThunk.fulfilled, (state, { payload }) => {
        const idx = state.categories.findIndex(c => c.id === payload.id)
        if (idx !== -1) state.categories[idx] = payload
      })
      .addCase(archiveCategoryThunk.fulfilled, (state, { payload }) => {
        state.categories = state.categories.filter(c => c.id !== payload)
      })
  },
})

export default categorySlice.reducer
