import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk, registerThunk, verifyTokenThunk } from './auth.thunk'
import { AuthUser } from '../types/user.type'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuth: boolean
  isLoading: boolean
  isSubmitting: boolean
  isServerAvailable: boolean
  error?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: true,
  isSubmitting: false,
  isServerAvailable: true,
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
      .addCase(verifyTokenThunk.pending, state => {
        state.isLoading = true
        state.isServerAvailable = true
      })
      .addCase(verifyTokenThunk.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(verifyTokenThunk.rejected, (state, { payload }) => {
        state.isLoading = false
        if (payload === 'unavailable') {
          state.isServerAvailable = false
        }
      })
  }
})

export const { setIsAuth, setToken, deleteToken, setIsLoading } = auth.actions

export default auth.reducer
