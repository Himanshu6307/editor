import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./Slices/user.slice.js"
export const store = configureStore({
    reducer: {
        user: userReducer
    }
})