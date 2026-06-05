import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllCategoryRequest, postCategoryRequest, updateCategoryRequest, archiveCategoryRequest } from './category.service'
import { CategoryType, CreateCategoryDto, UpdateCategoryDto } from '../types/category.type'

export const createCategoryThunk = createAsyncThunk<
  CategoryType,
  CreateCategoryDto,
  { rejectValue: string }
>('categories/create', async (data, { rejectWithValue }) => {
  try {
    const res = await postCategoryRequest(data)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const fetchCategoriesThunk = createAsyncThunk<
  CategoryType[],
  string | undefined,
  { rejectValue: string }
>('categories/fetchAll', async (search, { rejectWithValue }) => {
  try {
    const res = await getAllCategoryRequest(search)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const updateCategoryThunk = createAsyncThunk<
  CategoryType,
  { id: string; data: UpdateCategoryDto },
  { rejectValue: string }
>('categories/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await updateCategoryRequest(id, data)
    return res.data
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})

export const archiveCategoryThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('categories/archive', async (id, { rejectWithValue }) => {
  try {
    await archiveCategoryRequest(id)
    return id
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
})
