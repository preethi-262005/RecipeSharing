import {configureStore} from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice'

export const reduxStore=configureStore({
    reducer:{
        userLogin:userLoginReducer
    }
})