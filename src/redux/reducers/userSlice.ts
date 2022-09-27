import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  profile: {
    avatar: string;
    email: string;
    id: string;
    name: string;
    role: string;
    status: string;
  };
}

const initialState: UserState = {
  profile: {
    avatar: '',
    email: '',
    id: '',
    name: '',
    role: '',
    status: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    userLogout: (state) => {
      state.profile = {
        id: '',
        name: '',
        role: '',
        email: '',
        avatar: '',
        status: '',
      };
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
