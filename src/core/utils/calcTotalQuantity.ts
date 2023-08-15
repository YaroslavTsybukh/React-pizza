import {IItem} from "../redux/slices/cartSlice";

export const calcTotalQuantity = (items: IItem[]) => {
    return items.reduce((acc , item) => acc + item.count , 0)
}