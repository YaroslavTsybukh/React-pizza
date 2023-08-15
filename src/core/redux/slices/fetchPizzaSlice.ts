import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";

enum StateStatus {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}

interface IPizza {
    id?: string,
    imageUrl?: string,
    title?: string,
    types?: number[],
    sizes?: number[],
    price?: number,
    category?: number,
    rating?: number,
    composition?: string
}

interface IState {
    item: IPizza,
    status: StateStatus
}

const initialState: IState = {
    item: {},
    status: StateStatus.LOADING
}

export const fetchPizza = createAsyncThunk<IPizza , string>(
    'pizza/fetchPizzaSlice',
    async (param) => {
        const { data } = await axios.get<IPizza>(`https://6411cd6f3f3b9490ddd84633.mockapi.io/items/${param}`)
        return data
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizza.pending , (state) => {
                state.status = StateStatus.LOADING
            })
            .addCase(fetchPizza.fulfilled , (state , action) => {
                state.status = StateStatus.SUCCESS
                state.item = action.payload
            })
            .addCase(fetchPizza.rejected , (state , action) => {
                state.status = StateStatus.ERROR
            })
    }
})

export default pizzaSlice.reducer