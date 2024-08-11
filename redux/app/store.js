import { configureStore } from "@reduxjs/toolkit";
import poftfolioSlice from "../features/portfolio/poftfolioSlice";
import blogSlice from "../features/blog/blogSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import supportSlice from '../features/modal/supportSlice';



export const store = configureStore({
    reducer: {
        portfolio: poftfolioSlice,
        blog: blogSlice,
        toggle: toggleSlice,
        support: supportSlice
    },
});
