import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTagsRequest, postTagRequest, updateTagRequest, deleteTagRequest } from './tag.service'
import { TagType, CreateTagDto, UpdateTagDto } from '../types/tag.type'

export const fetchTagsThunk = createAsyncThunk<
  TagType[],
  string | undefined,
  { rejectValue: string }
>('tags/fetchAll', async (search, { rejectWithValue }) => {
  try {
    const res = await getAllTagsRequest(search)
    return res.data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const createTagThunk = createAsyncThunk<
  TagType,
  CreateTagDto,
  { rejectValue: string }
>('tags/create', async (data, { rejectWithValue }) => {
  try {
    const res = await postTagRequest(data)
    return res.data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const updateTagThunk = createAsyncThunk<
  TagType,
  { id: string; data: UpdateTagDto },
  { rejectValue: string }
>('tags/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateTagRequest(id, data)
    return res.data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})

export const deleteTagThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('tags/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteTagRequest(id)
    return id
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error')
  }
})
