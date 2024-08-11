// redux/features/portfolio/portfolioSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolioInfo: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addPortfolioInfo: (state, { payload }) => {
      state.portfolioInfo = payload;
    },
    clearPortfolioInfo: (state) => {
      state.portfolioInfo = null;
    },
  },
});

export const { addPortfolioInfo, clearPortfolioInfo } = portfolioSlice.actions;

export default portfolioSlice.reducer;
