import authReducer from './slices/auth';
import messageReducer from './slices/message';
import {configureStore} from "@reduxjs/toolkit";

const reducer = {
    auth: authReducer,
    massage: messageReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
})