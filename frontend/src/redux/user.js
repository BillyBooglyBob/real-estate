import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null
    },
    reducers: {
        LOGIN: (state, action) => {
            state.currentUser = action.payload
        },
        LOGOUT: (state, action) => {
            state.currentUser = null
        }
    }
})

export const { LOGIN, LOGOUT } = userSlice.actions
export default userSlice.reducer