import { configureStore } from "@reduxjs/toolkit";
import { expensesreducer } from "./redux/expensesSlice";

export const mystore=configureStore({
    reducer:{
        expensesreducer
    }
})