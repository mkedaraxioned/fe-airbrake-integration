import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  projects: [];
}

const initialState: any = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    allProjects: (state, action: PayloadAction<any>) => {
      state.projects = action.payload;
    },
  },
});

export const { allProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
