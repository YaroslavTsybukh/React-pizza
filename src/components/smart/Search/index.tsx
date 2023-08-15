import {FC, useRef, useCallback, useState, ChangeEvent} from "react";
import debounce from "lodash.debounce"
import {useAppDispatch} from "../../../core/hooks/hooks";
import {setSearchValue} from "../../../core/redux/slices/filterSlice";

import styles from "./Search.module.scss"

export const Search:FC = () => {
    const dispatch = useAppDispatch()
    const [inputValue , setInputValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const workWithFocus = () => {
        setInputValue("")
        dispatch(setSearchValue(''))
        inputRef.current?.focus()
    }

    const updateValue = useCallback(debounce((value) => {
        dispatch(setSearchValue(value))
    } , 1000) , [])

    const updateSearchValue = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        updateValue(e.target.value)
    }

    return(
        <div className={styles.block}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={updateSearchValue}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />

            <svg
                onClick={workWithFocus}
                className={styles.clearIcon}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
        </div>
    )
}