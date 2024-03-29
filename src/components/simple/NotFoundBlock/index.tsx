import {FC} from "react";
import styles from "./NotFoundBlock.module.scss"

export const NotFoundBlock: FC = () => {
    return(
        <div className={styles.wrapper}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>
                К сожалени данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    )
}