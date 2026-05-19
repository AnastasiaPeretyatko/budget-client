import { createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './auth.thunk'
import { AuthUser } from '../types/user.type'

type TInitialState = {
  user: AuthUser | null
  token: string | null
  isAuth: boolean
  isLoading: boolean
  error?: string
}

const initialState: TInitialState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: true
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, { payload }: { payload: boolean }) => {
      state.isAuth = payload
    },
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload
    },
    deleteToken: (state) => {
      state.token = null
    },
    toggleIsLoading: (state) => {
      console.log({ isLoading: state.isLoading });
      state.isLoading = !state.isLoading
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user
        localStorage.setItem('token', payload.token)
        localStorage.setItem('refreshToken', payload.refreshToken)
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.error = payload
        state.isLoading = false
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true
      })
  }
})

export const { setIsAuth, setToken, deleteToken, toggleIsLoading } = auth.actions

export default auth.reducer
