import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callapi } from "../Utils/apiCalls";

// Load persisted auth state from localStorage
const loadFromStorage = () => {
    try {
        const JWTToken = localStorage.getItem('JWTToken') || '';
        const userid = localStorage.getItem('userid') || '';
        return { JWTToken, userid };
    } catch (err) {
        console.log('Error loading auth from localStorage', err);
        return { JWTToken: '', userid: '' };
    }
};

export const loginThunk = createAsyncThunk('loginThunk', async (args, thunkAPI) => {
    try {
        let baseurl = process.env.REACT_APP_API_BASEURL;
        let reqbody = {};
        reqbody['email'] = args['email'];
        reqbody['password'] = args['password'];

        let result = await callapi('login/checklogin', 'post', reqbody);
        if (result['status'] == 'success') {

            let JWTToken = result['data']['token'];
            console.log('JWT Token is', JWTToken);
            //let userid = result['data']['userid'];
            thunkAPI.dispatch(authactions.setJWTToken(JWTToken));
            //thunkAPI.dispatch(authactions.setuserid(userid));
            return result;
        }
        else {
            return result;
        }
    }
    catch (err) {
        console.log(err);
    }
});

export const signupThunk = createAsyncThunk('signupThunk', async (args, thunkAPI) => {
    try {
        let baseurl = process.env.REACT_APP_API_BASEURL;
        let reqbody = {};
        reqbody['name'] = args['name'];
        reqbody['email'] = args['email'];
        reqbody['password'] = args['password'];
        let result = await callapi('login/createAccount', 'post', reqbody);
        if (result['status'] == 'success') {
            let JWTToken = result['data']['token'];
            console.log('JWT Token is', JWTToken);
            //let userid = result['data']['userid'];
            thunkAPI.dispatch(authactions.setJWTToken(JWTToken));
            //thunkAPI.dispatch(authactions.setuserid(userid));
            return result;
        }
        else {
            return result;
        }
    }
    catch (err) {
        console.log(err);
    }
});

export const logoutThunk = createAsyncThunk('logoutThunk', async (args, thunkAPI) => {
    try {
        console.log('in logout thunk');
        /*let baseurl = process.env.REACT_APP_API_BASEURL;
        let reqbody = {};
        reqbody['userid'] = args['userid'];*/
        /*let result = await callapi('login/logout', 'post', JSON.stringify(reqbody));
        if (result['status'] == 'success') {
            thunkAPI.dispatch(authactions.logout());
            return result;
        }
        else {
            return result;
        }*/
        thunkAPI.dispatch(authactions.logout());
    }
    catch (err) {
        console.log(err);
    }
});

let AuthSlice = createSlice({
    name: 'auth',
    initialState: loadFromStorage(),
    reducers: {
        setJWTToken(state, action) {
            state.JWTToken = action.payload;
            localStorage.setItem('JWTToken', action.payload);
        },
        setuserid(state, action) {
            state.userid = action.payload;
            localStorage.setItem('userid', action.payload);
        },
        logout(state) {
            state.JWTToken = '';
            state.userid = '';
            localStorage.removeItem('JWTToken');
            localStorage.removeItem('userid');
        }
    }
});
export const authreducer = AuthSlice.reducer;
export const authactions = AuthSlice.actions;
export const authstate = (state) => state.authreducer;

