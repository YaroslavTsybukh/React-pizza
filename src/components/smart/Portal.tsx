import {FC, ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";

interface IProps {
    open: boolean
    children: ReactNode
}

const root = document.querySelector("#root")

export const Portal: FC<IProps> = ({open, children}) => {
    const div = document.createElement("div")

    useEffect(() => {
        root!.after(div)
    })

    if(open) {
        return createPortal(children , div)
    } else {
        return null
    }
}