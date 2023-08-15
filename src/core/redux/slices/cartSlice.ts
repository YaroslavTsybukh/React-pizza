import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {calcTotalQuantity} from "../../utils/calcTotalQuantity";

export interface IItem{
    id: string,
    imageUrl: string,
    price: number,
    size: number,
    title: string,
    type: string,
    count: number
}

interface IState{
    items: IItem[],
    totalPrice: number,
    totalQuantity: number
}

const initialState: IState = {
    items: JSON.parse(localStorage.getItem('cart')!) || [],
    totalPrice: JSON.parse(localStorage.getItem('totalPrice')!) || 0,
    totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')!) || 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItems: (state , action:PayloadAction<IItem>) => {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if(findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count:1
                })
            }

            state.totalPrice = calcTotalPrice(state.items)
            state.totalQuantity = calcTotalQuantity(state.items)
        },
        minusQuantity: (state, action:PayloadAction<string>) => {
            const findItem = state.items.find(item => item.id === action.payload)

            if(findItem){
                findItem.count--
            }

            if(findItem?.count === 0) {
                const findIndex = state.items.findIndex(item => item.id === action.payload)
                state.items.splice(findIndex ,1)
            }

            state.totalPrice = calcTotalPrice(state.items)
            state.totalQuantity = calcTotalQuantity(state.items)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            state.totalQuantity = 0
        },
        removeItem: (state , action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)

            state.totalPrice = calcTotalPrice(state.items)
            state.totalQuantity = calcTotalQuantity(state.items)
        }
    }
})

export const { addItems , clearItems , minusQuantity , removeItem } = cartSlice.actions
export default cartSlice.reducer
