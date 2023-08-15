import {FC, useState} from "react";
import {Formik , Form } from "formik"
import {useAppSelector , useAppDispatch} from "../../../core/hooks/hooks";
import {setUser} from "../../../core/redux/slices/userSlice";
import {auth} from "../../../firebase"
import { EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth'
import {Portal} from "../Portal";
import {Modal} from "../Modal/Modal";
import {ProfileService} from "../../../core/services/profile.service";
import {useNavigate} from "react-router-dom";

import styles from "./MyInfo.module.scss"

export const MyInfo: FC = () => {
    const {user} = useAppSelector(state => state.user)
    const [open , setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const [name , setName] = useState(user?.name || "")
    const [email , setEmail] = useState(user?.email || "")
    const navigate = useNavigate()

    const updateUserData = async() => {
        const userData = auth.currentUser

        if(userData){
            try{
                await ProfileService.updateProfile(userData , name)
                await ProfileService.updateEmail(userData , email)
                await ProfileService.sendEmailVerification(userData)
            }
            catch(e){
                if(e instanceof Error){
                    console.log(e.message)

                    // return(
                    //
                    // )

                    // const credential = EmailAuthProvider.credential(
                    //     userData.email,
                    //
                    // )


                }else if(typeof e == "string"){
                    console.log(e)
                }
            }
        }
    }

    return(
        <div>
            <h2>Mои данные</h2>
            <Formik
                enableReinitialize={true}
                initialValues={{name , email}}
                onSubmit={(values) => {
                    if(user) {
                        localStorage.setItem('user' , JSON.stringify({...user , ...values}))
                        dispatch(setUser({...user , ...values}))


                            updateUserData()


                    }
                }}
                >
                {({handleBlur}) => (
                    <Form className={styles.form}>
                        <input className={styles.inputName}
                               type="text"
                               name="name"
                               placeholder="Имя"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               onBlur={handleBlur}/>
                        <input className={styles.inputEmail}
                               type="text" name="email"
                               placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               onBlur={handleBlur}/>

                        <button className={styles.button}
                                type="submit">Сохранить</button>
                    </Form>
                )}
            </Formik>
            <Portal open={false}>
                <Modal setOpen={setOpen}/>
            </Portal>
        </div>
    )
}