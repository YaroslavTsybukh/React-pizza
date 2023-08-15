import {IItem} from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: IItem[]) => {
    return items.reduce((acc , item) => item.price * item.count + acc , 0)
}