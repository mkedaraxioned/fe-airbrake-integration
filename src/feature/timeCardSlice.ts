import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timecards } from '../interfaces/timeCard';

export interface TimeCardState {
  currentSelectedDate: Date;
  timeCardDetails: Timecards | null;
}

const initialState: TimeCardState = {
  currentSelectedDate: new Date(),
  timeCardDetails: null,
};

export const timeCardSlice = createSlice({
  name: 'timecard',
  initialState,
  reducers: {
    addSelectedDate: (state, action: PayloadAction<any>) => {
      state.currentSelectedDate = action.payload;
    },
    setTimeCardDetails: (state, action: PayloadAction<any>) => {
      state.timeCardDetails = action.payload;
    },
  },
});

export const { addSelectedDate, setTimeCardDetails } = timeCardSlice.actions;
export default timeCardSlice.reducer;
