import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  users: [];
}

const initialState: any = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    allUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export const { allUsers } = usersSlice.actions;
export default usersSlice.reducer;
