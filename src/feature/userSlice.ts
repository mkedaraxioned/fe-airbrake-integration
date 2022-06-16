import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
  role: string;
}

const initialState: UserState = {
  name: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    userLogout: (state) => {
      state.name = '';
      state.role = '';
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
