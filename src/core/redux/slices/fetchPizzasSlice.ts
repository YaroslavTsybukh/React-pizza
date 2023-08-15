import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

enum StateStatus {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface IPizza {
    id: string,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number,
    composition: string
}

interface SearchPizzaParams {
    sortBy: string;
    order: string;
    category: string;
    search: string;
};

interface IState {
    items: IPizza[],
    status: StateStatus
}

const initialState: IState = {
    items: [],
    status: StateStatus.LOADING
}

export const fetchPizzas = createAsyncThunk<IPizza[] , SearchPizzaParams>(
    'pizzas/fetchPizzas',
    async (params) => {
        const { category , sortBy , order , search } = params
        const { data } = await axios.get<IPizza[]>(`https://6411cd6f3f3b9490ddd84633.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending , (state) => {
                state.status = StateStatus.LOADING
            })
            .addCase(fetchPizzas.fulfilled, (state , action) => {
                state.items = action.payload
                state.status = StateStatus.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = StateStatus.ERROR
            })
    }
})

export default pizzasSlice.reducer