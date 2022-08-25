import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  clients: [],
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    allClients: (state, action: PayloadAction<any>) => {
      state.clients = action.payload;
    },
  },
});

export const { allClients } = clientsSlice.actions;
export default clientsSlice.reducer;
