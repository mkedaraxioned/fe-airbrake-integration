import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimeCardState {
  currentSelectedDate: Date;
}

const initialState: TimeCardState = {
  currentSelectedDate: new Date(),
};

export const timeCardSlice = createSlice({
  name: 'timecard',
  initialState,
  reducers: {
    addSelectedDate: (state, action: PayloadAction<any>) => {
      state.currentSelectedDate = action.payload;
    },
  },
});

export const { addSelectedDate } = timeCardSlice.actions;
export default timeCardSlice.reducer;
