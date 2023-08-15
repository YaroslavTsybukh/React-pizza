import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    categoryIndex: number,
    searchValue: string
}

const initialState: IState = {
    categoryIndex: 0,
    searchValue: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryIndex: (state, action: PayloadAction<number>) => {
            state.categoryIndex = action.payload
        },
        setSearchValue: (state , action: PayloadAction<string>) => {
            state.searchValue = action.payload
        }
    }
})

export const {setCategoryIndex , setSearchValue} = filterSlice.actions
export default filterSlice.reducer