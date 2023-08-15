import {FC} from "react";
import styles from "./OrderHistoryView.module.scss"

export const OrderHistoryView: FC = () => {
    return(
        <div>
            <h2>История заказов</h2>
            <table border={1} className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.th}>Заказ</th>
                        <th className={styles.th}>Дата</th>
                        <th className={styles.th}>Сумма</th>
                        <th className={styles.th}>Адрес</th>
                    </tr>
                    <tr>
                        <td className={styles.td}>Пример заказа</td>
                        <td className={styles.td}>Пример даты</td>
                        <td className={styles.td}>Пример суммы</td>
                        <td className={styles.td}>Пример адресса</td>
                        <td className={styles.td}>
                            <div className={styles.showOrder}>Посмотреть заказ</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}