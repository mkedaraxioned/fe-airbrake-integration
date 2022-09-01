import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Timecards } from '../../interfaces/timeCard';

export interface TimeCardState {
  currentSelectedDate: string;
  timeCardDetails: Timecards | null;
  selectedProject: Project | null;
}

const initialState: TimeCardState = {
  currentSelectedDate: new Date().toISOString(),
  timeCardDetails: null,
  selectedProject: null,
};

export const timeCardSlice = createSlice({
  name: 'timecard',
  initialState,
  reducers: {
    updateSelectedDate: (state, action: PayloadAction<any>) => {
      state.currentSelectedDate = action.payload;
    },
    updateTimeCardDetails: (state, action: PayloadAction<any>) => {
      state.timeCardDetails = action.payload;
    },
    updateSelectedProject: (state, action: PayloadAction<any>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  updateSelectedDate,
  updateTimeCardDetails,
  updateSelectedProject,
} = timeCardSlice.actions;
export default timeCardSlice.reducer;
