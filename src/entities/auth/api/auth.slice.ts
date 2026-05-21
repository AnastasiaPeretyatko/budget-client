import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk } from './auth.thunk'
import { AuthUser } from '../types/user.type'

type AuthState = {
  user: AuthUser | null
  token: string | null
  isAuth: boolean
  isLoading: boolean
  error?: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: true
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
        state.isLoading = true
        state.error = undefined
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
  }
})

export const { setIsAuth, setToken, deleteToken, setIsLoading } = auth.actions

export default auth.reducer
