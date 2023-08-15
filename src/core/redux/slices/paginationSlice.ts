import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    currentPage: number,
    quantityPerPage: number
}

const initialState: IState = {
    currentPage: 1,
    quantityPerPage: 4
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state , action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setPrevPage: (state , action: PayloadAction<number>) => {
            const index = state.currentPage - 1

            if(index < 1) {
                state.currentPage =  action.payload
            }else {
                state.currentPage =  index
            }
        },
        setNextPage: (state , action: PayloadAction<number[]>) => {
            const index = state.currentPage + 1

            if(index > action.payload.length) {
                state.currentPage = action.payload[0]
            } else {
                state.currentPage = index
            }
        }
    }
})

export default paginationSlice.reducer
export const {setCurrentPage , setPrevPage , setNextPage} = paginationSlice.actions