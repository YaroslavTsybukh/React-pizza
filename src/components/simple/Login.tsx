import {FC} from "react";
import {Field, Form , ErrorMessage} from "formik";

import styles from "../smart/FormForEntry/FormForEntry.module.scss";

export const Login: FC = () => {
    return (
        <Form className={styles.form}>
            <Field className={styles.input} type="text" name="email" placeholder="Email"/>
            <ErrorMessage name="email" />

            <Field className={styles.input} type="text" name="password" placeholder="Пароль"/>
            <ErrorMessage name="password" />

            <button className="button button--outline button--add"
                    type="submit">Войти в систему</button>
        </Form>
    )
}