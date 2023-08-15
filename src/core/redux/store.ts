import {configureStore} from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import sort from "./slices/sortSlice";
import pagination from "./slices/paginationSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/fetchPizzasSlice";
import pizza from "./slices/fetchPizzaSlice";
import user from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        filter,
        sort,
        pagination,
        cart,
        pizzas,
        pizza,
        user
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch