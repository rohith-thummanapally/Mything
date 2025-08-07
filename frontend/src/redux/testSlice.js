import { createSlice } from "@reduxjs/toolkit";


let initialState={countervalue:0};
const counterSlice=createSlice({
    name:'counterSlice',
    initialState:initialState,
    reducers:{
        'Increment':(state,action)=>{
            if(action.payload.type=='incr')
            {
                state.countervalue+=1;
            }
        }
    }
});


export const counterReducer=counterSlice.reducer;
export const counterActions=counterSlice.actions;
export const counterState=(store)=>store.counterReducer;