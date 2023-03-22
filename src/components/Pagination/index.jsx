import styles from "./Pagination.module.scss"

export const Pagination = ({totalPizzas , quantityPerPage , paginate , currentPage , displayPrevPage , displayNextPage}) => {
    let pageNumbers = []

    for(let i = 1; i<= Math.ceil(totalPizzas/quantityPerPage) ; i++) {
        pageNumbers.push(i)
    }
    return(
        <div className={styles.pagination}>
            <button className={styles.button} onClick={() => displayPrevPage(pageNumbers[pageNumbers.length-1])}>←</button>
                <ul className={styles.list}>
                    {pageNumbers.map(number => (
                        <li key={number}
                            className={`${styles.listItem} ${number === currentPage ? styles.listItemActive : ""}`}
                            onClick={() => paginate(number)}>
                            <a href="#">{number}</a>
                        </li>
                    ))}
                </ul>
            <button className={styles.button} onClick={() => displayNextPage(pageNumbers)}>→</button>
        </div>
    )
}