import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  filterVal: {
    myprojects: true,
    type: '',
    project: '',
  },
};

export const projectFilter = createSlice({
  name: 'projectFilter',
  initialState,
  reducers: {
    filterFunc: (state, action: PayloadAction<any>) => {
      state.filterVal = action.payload;
    },
  },
});

export const { filterFunc } = projectFilter.actions;
export default projectFilter.reducer;
