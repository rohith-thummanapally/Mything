import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callapi } from "../Utils/apiCalls";
import { act } from "react";

export const addExpenseThunk = createAsyncThunk('addExpenseThunk',
    async (args, thunkAPI) => {
        console.log('in add expense thunk');
        console.log(args);
        args['userid'] = 1;
        /*await fetch(baseurl+'expenses/addexpense',{
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
        })*/
        let result = await callapi('expenses/addexpense', 'post', args);
        if (result["success"] == true) {
            let insid = result["data"];
            args["id"] = insid;
            thunkAPI.dispatch(expensesactions.addExpense({ "type": "append", "data": args }));
        }
    }
);

export const getExpensesThunk = createAsyncThunk('getExpensesThunk',
    async (args, thunkAPI) => {
        try {
            console.log('in get expenses thunk');
            console.log(args);
            let baseurl = process.env.REACT_APP_API_BASEURL;
            let reqbody = {};//new FormData();
            //let expensesdata=thunkAPI.getState()['expensesreducer'];
            let { categories, tags, fromdate, todate } = args;//expensesdata;
            reqbody['categoires'] = categories;
            reqbody['tags'] = tags;
            reqbody['fromdate'] = fromdate;
            reqbody['todate'] = todate;
            reqbody['limit'] = 50;
            reqbody['start'] = 0;
            console.log(reqbody);
            /*await fetch(baseurl + 'expenses/getmyexpenses', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(reqbody)
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    if (result['success'] == true) {
                        let expdata = result['data'];
                        thunkAPI.dispatch(expensesactions.addExpense({ "type": "replace", "data": expdata }));
                    }
                })*/
            let result = await callapi('expenses/getmyexpenses', 'post', reqbody);
            if (result['success'] == true) {
                let expdata = result['data'];
                thunkAPI.dispatch(expensesactions.addExpense({ "type": "replace", "data": expdata }));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
)

export const getdaywiseExpensesThunk = createAsyncThunk('getdaywiseExpenses',
    async (args, thunkAPI) => {
        try {
            let reqbody = {};
            let { categories, tags, fromdate, todate } = args;//expensesdata;
            reqbody['categoires'] = categories;
            reqbody['tags'] = tags;
            reqbody['fromdate'] = fromdate;
            reqbody['todate'] = todate;
            console.log(reqbody);
            let result = await callapi('expenses/getdaywiseexpenses', 'post', reqbody);
            if (result['success'] == true) {
                let expdata = result['data'];
                console.log('*************************');
                console.log(expdata);
                thunkAPI.dispatch(expensesactions.changedaywiseexpenses({ "type": "updatedata", "data": expdata }));
            }

        }
        catch (err) {
            console.log(err);
        }
    }
)
export const getcategoriestagsThunk = createAsyncThunk('getcategoriestags',
    async (args, thunkAPI) => {
        try {
            let userid = 1;
            let baseurl = process.env.REACT_APP_API_BASEURL;
            let reqbody = { "userid": userid };
            /*await fetch(baseurl + 'expenses/getcategories?userid=' + userid,
                {
                    method: 'get'
                }
            )
                .then(req => req.json())
                .then((result) => {
                    console.log(result);
                    if (result["success"] == true) {
                        result["data"] = [{ "id": '', "category_name": 'None' }, ...result["data"]];
                        thunkAPI.dispatch(expensesactions.changecategories({ "type": "allcategories", "data": result["data"] }));
                    }
                });*/
            let result = await callapi('expenses/getcategories', 'get', null);
            if (result["success"] == true) {
                result["data"] = [{ "id": '', "category_name": 'None' }, ...result["data"]];
                thunkAPI.dispatch(expensesactions.changecategories({ "type": "allcategories", "data": result["data"] }));
            }

            /*await fetch(baseurl + 'expenses/gettags?userid=' + userid,
                {
                    method: 'get'
                }
            )
                .then(req => req.json())
                .then((result) => {
                    console.log(result);
                    if (result["success"] == true) {
                        thunkAPI.dispatch(expensesactions.changetags({ "type": "alltags", "data": result["data"] }));
                    }
                });*/
            let result2 = await callapi('expenses/gettags', 'get', null);
            if (result2["success"] == true) {
                thunkAPI.dispatch(expensesactions.changetags({ "type": "alltags", "data": result2["data"] }));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
);

export const getcategorywiseexpensesThunk = createAsyncThunk('getcategorywiseexpenses', async (args, thunkAPI) => {
    try {
        let reqbody = {};
        //let { categories, tags, fromdate, todate } = args;//expensesdata;
        let { categories, tags, fromdate, todate } = thunkAPI.getState()['expensesreducer'];
        reqbody['categoires'] = categories;
        reqbody['tags'] = tags;
        reqbody['fromdate'] = fromdate;
        reqbody['todate'] = todate;
        console.log(reqbody);
        let result = await callapi('expenses/getcategorywiseexpenses', 'get', reqbody);
        if (result['success'] == true) {
            let expdata = result['data'];
            console.log('*************************');
            console.log(expdata);
            thunkAPI.dispatch(expensesactions.changecategorywiseexpenses({ "type": "updatedata", "data": expdata }));
        }
    }
    catch (err) {
        console.log(err);
    }
});

export const gettagwiseexpensesThunk = createAsyncThunk('gettagwiseexpenses', async (args, thunkAPI) => {
    try {
        let reqbody = {};
        let { categories, tags, fromdate, todate } = thunkAPI.getState()['expensesreducer'];
        reqbody['categoires'] = categories;
        reqbody['tags'] = tags;
        reqbody['fromdate'] = fromdate;
        reqbody['todate'] = todate;
        console.log(reqbody);
        let result = await callapi('expenses/gettagwiseexpenses', 'get', reqbody);
        if (result['success'] == true) {
            let expdata = result['data'];
            console.log('*************************');
            console.log(expdata);
            thunkAPI.dispatch(expensesactions.changetagwiseexpenses({ "type": "updatedata", "data": expdata }));
        }
    }
    catch (err) {
        console.log(err);
    }
});

let today = new Date();
let pastday = new Date();
pastday.setDate(today.getDate() - 30)
let fromday = pastday.toISOString().split('T')[0];

let initialState = {
    'expenses': [],
    'categories': '',
    'tags': [],
    'allcategories': '',
    'alltags': '',
    'daywiseexpenses': [],
    'categorywiseexpenses': [],
    'tagwiseexpenses': [],
    'fromdate': fromday,
    'todate': new Date().toISOString().split('T')[0]
};
const expensesSlice = createSlice({
    name: 'expenses',
    initialState: initialState,
    reducers: {
        'addExpense': (state, action) => {
            console.log('in add Expense reducer');
            console.log(action.payload);
            if (action.payload["type"] == "replace") {
                state.expenses = action.payload["data"];
            }
            else if (action.payload["type"] == "append") {
                state.expenses.push(action.payload["data"]);
            }
        },
        'editExpense': (state, action) => {

        },
        'deleteExpense': (state, action) => {

        },
        'changecategories': (state, action) => {
            if (action.payload["type"] == 'allcategories') {
                state.allcategories = action.payload["data"];
            }
            else {
                state.categories = action.payload["data"];
            }
        },
        'changetags': (state, action) => {
            if (action.payload["type"] == 'alltags') {
                state.alltags = action.payload["data"];
            }
            else {
                state.tags = action.payload["data"];
            }
        },
        'changeFromdate': (state, action) => {
            if (action.payload["type"] == 'changefromdate') {
                state.fromdate = action.payload["data"];
            }
        },
        'changeTodate': (state, action) => {
            if (action.payload["type"] == 'changetodate') {
                state.todate = action.payload["data"];
            }
        },
        'changedaywiseexpenses': (state, action) => {
            if (action.payload["type"] == 'updatedata') {
                state.daywiseexpenses = action.payload["data"];
            }
        },
        'changecategorywiseexpenses': (state, action) => {
            if (action.payload["type"] == 'updatedata') {
                state.categorywiseexpenses = action.payload["data"];
            }
        },
        'changetagwiseexpenses': (state, action) => {
            if (action.payload["type"] == 'updatedata') {
                state.tagwiseexpenses = action.payload["data"];
            }
        }
    }
});

export const expensesreducer = expensesSlice.reducer;
export const expensesactions = expensesSlice.actions;
export const expensesstate = (store) => store.expensesreducer;
