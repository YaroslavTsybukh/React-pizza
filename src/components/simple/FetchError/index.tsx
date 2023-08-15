import {FC} from "react";
import styles from "./FetchError.module.scss"

export const FetchError: FC = () => {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>
                Произошла ошибка <span>😕</span>
            </h2>
            <p className={styles.paragraph}>
                Попробуйте сделать запрос немного позже.
            </p>
        </div>
    )
}