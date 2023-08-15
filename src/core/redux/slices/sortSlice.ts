import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ISort {
    name: string,
    sortProperty: string
}

interface IState {
    sort: ISort
}

const initialState: IState = {
    sort: {
        name: 'популярности DESC',
        sortProperty: "rating"
    }
}

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortValue: (state , action: PayloadAction<ISort>) => {
            state.sort = action.payload
        }
    }
})

export const {setSortValue} = sortSlice.actions
export default sortSlice.reducer