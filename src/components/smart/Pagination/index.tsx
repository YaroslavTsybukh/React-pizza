import {FC} from "react";
import {useAppDispatch} from "../../../core/hooks/hooks";
import {setCurrentPage , setPrevPage , setNextPage} from "../../../core/redux/slices/paginationSlice";
import styles from "./Pagination.module.scss"

interface IProps{
    totalPizzas: number,
    quantityPerPage: number,
    currentPage: number,

}

export const Pagination: FC<IProps> = ({totalPizzas , quantityPerPage , currentPage}) => {
    const dispatch = useAppDispatch()
    let pageNumbers: number[] = []


    for(let i = 1; i<= Math.ceil(totalPizzas/quantityPerPage) ; i++) {
        pageNumbers.push(i)
    }

    return(
        <div className={styles.pagination}>
            <button className={styles.button} onClick={() => dispatch(setPrevPage(pageNumbers[pageNumbers.length-1]))}>←</button>
                <ul className={styles.list}>
                    {pageNumbers.map(number => (
                        <li key={number}
                            className={`${styles.listItem} ${number === currentPage ? styles.listItemActive : ""}`}
                            onClick={() => dispatch(setCurrentPage(number))}>
                            {number}
                        </li>
                    ))}
                </ul>
            <button className={styles.button} onClick={() => dispatch(setNextPage(pageNumbers))}>→</button>
        </div>
    )
}