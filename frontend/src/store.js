import { configureStore } from "@reduxjs/toolkit";
import { expensesreducer } from "./redux/expensesSlice";
import { counterReducer } from "./redux/testSlice";
import { authreducer } from "./redux/authSlice";
import logger from "./middlewares/logger";

export const mystore = configureStore({
    reducer: {
        expensesreducer,
        counterReducer,
        authreducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger)
})