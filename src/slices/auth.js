import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";
import {setMessage} from "./message";


const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/signup",
    async (
        {
            firstname,
            lastname,
            email,
            password,
            gender,
            bDay,
            bMonth,
            bYear
        },
        thunkAPI
    ) => {
        try {
            const response = await AuthService.register({
                firstname,
                lastname,
                email,
                password,
                gender,
                bDay,
                bMonth,
                bYear
            });
            thunkAPI.dispatch(setMessage(response.data.code))
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const login = createAsyncThunk(
    "auth/signin",
    async ({email, password}, thunkAPI) => {
        try {
            const response = await AuthService.login(email, password);
            thunkAPI.dispatch(setMessage(response.data.code))
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const logout = createAsyncThunk(
    "auth/signout",
    async ()=> {
        await AuthService.logout();
    }
)

const initialState = user ?
    {isLoggedIn: true, user} :
    {isLoggedIn: false, user: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [register.rejected]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})

const {reducer} = authSlice;
export default reducer;