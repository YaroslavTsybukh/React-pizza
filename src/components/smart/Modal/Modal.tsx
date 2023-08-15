import {FC} from "react";
import {Formik , Form , Field} from "formik";
import {useAppSelector} from "../../../core/hooks/hooks";
import {GlobalSvgSelectors} from "../../../assets/icons/globalSvgSelectors";
import styles from "./Modal.module.scss"

interface IProps {
    setOpen: (value: boolean) => void
}

export const Modal: FC<IProps> = ({setOpen}) => {
    // const {selectedDate} = useAppSelector(state => state.weather)

    return(
        <div className={styles.modalWrapper} >
            <div className={styles.modalBlock}>

                <div className={styles.cross} >
                    <GlobalSvgSelectors id="cross"/>
                </div>

                <Formik
                    initialValues={{password: ""}}
                    onSubmit={({password}, {resetForm}) => {

                }}>
                    {({}) => (
                        <Form>
                            <Field className={styles.inputPassword} placeholder="Пароль"/>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}