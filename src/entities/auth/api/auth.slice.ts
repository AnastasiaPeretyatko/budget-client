import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk, registerThunk } from './auth.thunk'
import { AuthUser } from '../types/user.type'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuth: boolean
  isLoading: boolean
  isSubmitting: boolean
  error?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: true,
  isSubmitting: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    deleteToken: (state) => {
      state.token = null
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isSubmitting = true
        state.error = undefined
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user
        state.token = payload.token
        state.isAuth = true
        state.isSubmitting = false
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isSubmitting = false
      })
      .addCase(registerThunk.pending, state => {
        state.isSubmitting = true
        state.error = undefined
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user
        state.token = payload.token
        state.isAuth = true
        state.isSubmitting = false
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isSubmitting = false
      })
  }
})

export const { setIsAuth, setToken, deleteToken, setIsLoading } = auth.actions

export default auth.reducer
