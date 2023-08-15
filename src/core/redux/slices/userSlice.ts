import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    id: string
    name: string | null
    email: string | null
    accessToken: string
}

interface IState {
    user: IUser | null
}

const initialState: IState = {
    user: JSON.parse(localStorage.getItem("user")!) || null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state , action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        // update: (state , action: PayloadAction<>) => {
        //     state.user?.name = action.payload
        // },
        loginOut: (state) => {
            state.user = null
        }
    }
})

export default userSlice.reducer
export const {setUser , loginOut} = userSlice.actions