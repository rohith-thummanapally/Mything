import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const addExpenseThunk=createAsyncThunk('addExpenseThunk',
    async (args,thunkAPI)=>{
        console.log('in add expense thunk');
        console.log(args);
        args['userid']=1;
        let baseurl=process.env.REACT_APP_API_BASEURL;
        await fetch(baseurl+'expenses/addexpense',{
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(args)
        })
        .then(res=>res.json())
        .then((result)=>{
            console.log(result);
            if(result["success"]==true)
            {
                let insid=result["data"];
                args["id"]=insid;
                thunkAPI.dispatch(expensesactions.addExpense({"type":"append","data":args}));
            }
        })
    }
);

export const getExpensesThunk=createAsyncThunk('getExpensesThunk',
    async (args,thunkAPI)=>{
        try{
            console.log('in get expenses thunk');
            let baseurl=process.env.REACT_APP_API_BASEURL;
            let reqbody={};//new FormData();
            let expensesdata=thunkAPI.getState()['expensesreducer'];
            let {categories,tags,fromdate,todate}=expensesdata;
            reqbody['userid']=1;
            reqbody['categoires']=categories;
            reqbody['tags']=tags;
            reqbody['fromdate']=fromdate;
            reqbody['todate']=todate;
            reqbody['limit']=50;
            reqbody['start']=0;
            console.log(reqbody);
            await fetch(baseurl+'expenses/getmyexpenses',{
                method:'post',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(reqbody)
            })
            .then(res=>res.json())
            .then((result)=>{
                console.log(result);
                if(result['success']==true)
                {
                    let expdata=result['data'];
                    thunkAPI.dispatch(expensesactions.addExpense({"type":"replace","data":expdata}));
                }
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
)

let today=new Date();
let pastday=new Date();
pastday.setDate(today.getDate()-30)
let fromday=pastday.toISOString().split('T')[0];

let initialState={'expenses':[],'categories':'','tags':[],'fromdate':fromday,'todate':new Date().toISOString().split('T')[0]};
const expensesSlice=createSlice({
    name:'expenses',
    initialState:initialState,
    reducers:{
        'addExpense':(state,action)=>{
            console.log('in add Expense reducer');
            console.log(action.payload);
            if(action.payload["type"]=="replace")
            {
                state.expenses=action.payload["data"];
            }
            else if(action.payload["type"]=="append"){
                state.expenses.push(action.payload["data"]);
            }
        },
        'editExpense':(state,action)=>{

        },
        'deleteExpense':(state,action)=>{

        },
        'changecategories':(state,action)=>{
            state.categories=action.payload;
        },
        'changetags':(state,action)=>{

        }
    }
});

export const expensesreducer=expensesSlice.reducer;
export const expensesactions=expensesSlice.actions;
export const expensesstate=(store)=>store.expensesreducer;
