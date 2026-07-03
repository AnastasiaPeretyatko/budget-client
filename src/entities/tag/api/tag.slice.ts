import { createSlice } from '@reduxjs/toolkit'
import { fetchTagsThunk, createTagThunk, updateTagThunk, deleteTagThunk } from './tag.thunk'
import { TagType } from '../types/tag.type'

type TagState = {
  tags: TagType[]
  isLoading: boolean
  error?: string
}

const initialState: TagState = {
  tags: [],
  isLoading: false,
}

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTagsThunk.pending, state => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchTagsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tags = payload
      })
      .addCase(fetchTagsThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(createTagThunk.fulfilled, (state, { payload }) => {
        state.tags.unshift(payload)
      })
      .addCase(updateTagThunk.fulfilled, (state, { payload }) => {
        const idx = state.tags.findIndex(t => t.id === payload.id)
        if (idx !== -1) state.tags[idx] = payload
      })
      .addCase(deleteTagThunk.fulfilled, (state, { payload }) => {
        state.tags = state.tags.filter(t => t.id !== payload)
      })
  },
})

export default tagSlice.reducer
