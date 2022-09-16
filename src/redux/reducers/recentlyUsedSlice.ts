import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  recentlyUsedProject: [],
};
const updateState = (state: any, data: any) => {
  const projectIds = state.recentlyUsedProject.map(
    (project: any) => project?.projectId,
  );

  if (!projectIds.includes(data.projectId)) {
    state.recentlyUsedProject.unshift(data);
    if (state.recentlyUsedProject.length > 5) {
      state.recentlyUsedProject.pop();
    }
  }
};

export const recentlyUsedSlice = createSlice({
  name: 'recentyUsed',
  initialState,
  reducers: {
    recentlyUsed: (state, action: PayloadAction<any>) => {
      updateState(state, action.payload);
    },
  },
});

export const { recentlyUsed } = recentlyUsedSlice.actions;
export default recentlyUsedSlice.reducer;
