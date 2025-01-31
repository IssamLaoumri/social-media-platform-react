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

export const csrfToken = createAsyncThunk(
    "auth/csrf-token",
    async()=> {
        try {
            const response = await AuthService.fetchCsrfToken();
            return response.token;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            console.log(message);
        }
    }
)

const initialState = user ?
    {isLoggedIn: true, user} :
    {isLoggedIn: false, user: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            });
    },
});

const {reducer} = authSlice;
export default reducer;