import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SelectedPeriodState = {
  selectedPeriodId: string | null
}

const initialState: SelectedPeriodState = {
  selectedPeriodId: null,
}

const selectedPeriodSlice = createSlice({
  name: 'selectedPeriod',
  initialState,
  reducers: {
    setSelectedPeriodId: (state, { payload }: PayloadAction<string | null>) => {
      state.selectedPeriodId = payload
    },
  },
})

export const { setSelectedPeriodId } = selectedPeriodSlice.actions
export default selectedPeriodSlice.reducer
