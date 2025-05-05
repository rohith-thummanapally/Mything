import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const addExpenseThunk=createAsyncThunk('addExpenseThunk',
    async (args,thunkAPI)=>{

    
    }
);

export const getExpensesThunk=createAsyncThunk('getExpensesThunk',
    async (args,thunkAPI)=>{
        try{
            console.log('in get expenses thunk');
            let baseurl=process.env.REACT_APP_API_BASEURL;
            console.log(baseurl);
        }
        catch(err)
        {
            console.log(err);
        }
    }
)
let initialState={'expenses':{},'categories':[],'tags':[],'fromdate':new Date().toDateString(),'todate':new Date().toString()};
const expensesSlice=createSlice({
    name:'expenses',
    initialState:initialState,
    reducers:{
        'addExpense':(state,action)=>{

        },
        'editExpense':(state,action)=>{

        },
        'deleteExpense':(state,action)=>{

        }
    }
});

export const expensesreducer=expensesSlice.reducer;
export const expensesactions=expensesSlice.actions;
export const expensesstate=(store)=>store.expensesreducer;
