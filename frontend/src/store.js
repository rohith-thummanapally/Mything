import { configureStore } from "@reduxjs/toolkit";
import { expensesreducer } from "./redux/expensesSlice";
import { counterReducer } from "./redux/testSlice";
export const mystore=configureStore({
    reducer:{
        expensesreducer,
        counterReducer
    }
})