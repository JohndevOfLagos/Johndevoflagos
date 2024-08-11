// store/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    supportMeInfo: null,
}

const supporMeSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
      addSupportMeInfo: (state, { payload }) => {
        state.supportMeInfo = payload;
      },
      clearSupportMeInfo: (state) => {
        state.supportMeInfo = null;
      },
    },
  });
  
  export const { addSupportMeInfo, clearSupportMeInfo } = supporMeSlice.actions;
  
  export default supporMeSlice.reducer;