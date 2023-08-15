import {FC , useState} from "react";
import {Formik} from "formik";
import {object , string} from "yup"
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from "firebase/auth";
import {useAppDispatch} from "../../../core/hooks/hooks";
import {auth} from "../../../firebase";
import {setUser , IUser} from "../../../core/redux/slices/userSlice";
import {Login} from "../../simple/Login";
import {Register} from "../../simple/Register";
import {useNavigate} from "react-router-dom";
import { ROUTES } from "../../../routes";

import styles from "./FormForEntry.module.scss"

interface IFormValues {
    name?: string,
    email: string,
    password: string
}

export const FormForEntry: FC = () => {
    const [status , setStatus] = useState<string>("auth")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const initialLoginValues: IFormValues = {email: "" , password: ""}
    const initialRegisterValues: IFormValues = {name: "" , email: "" , password: ""}

    const handleClick = () => {
        setStatus(status == "auth" ? 'register' : 'auth')
    }

    const logInUser = async(email: string, password: string) => {
        try{
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            const accessToken = await user.getIdToken()

            const data: IUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                accessToken
            }
            dispatch(setUser(data))

            localStorage.setItem("user" , JSON.stringify({...data}))
            navigate(`${ROUTES.PROFILE}` , {replace: true})
        }catch(e){
            if(e instanceof Error){
                alert(e.message)
            } else if (typeof e == 'string'){
                alert(e)
            }
        }
    }

    const registerUser = async(name: string , email: string , password: string) => {
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(user , {
                displayName: name
            })
            const accessToken = await user.getIdToken()

            const data: IUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                accessToken
            }
            dispatch(setUser(data))

            localStorage.setItem("user" , JSON.stringify({...data}))
            navigate(`${ROUTES.PROFILE}` , {replace: true})
        }catch(e){
            if(e instanceof Error){
                alert(e.message)
            } else if (typeof e == 'string'){
                alert(e)
            }
        }
    }

    const validationForLogin = object({
        email: string()
            .min(6 , "Минимальное значение 6")
            .required("Это поле должно быть заполнено")
            .email("Должен быть валидный эмейл"),
        password: string()
            .min(6 , "Минимальное значение 6")
            .required("Это поле должно быть заполнено")
    })

    const validationForRegister = object({
        name: string()
            .min(6 , "Минимальное значение 6")
            .required("Это поле должно быть заполнено"),
        email: string()
            .min(6 , "Минимальное значение 6")
            .required("Это поле должно быть заполнено")
            .email("Должен быть валидный эмейл"),
        password: string()
            .min(6 , "Минимальное значение 6")
            .required("Это поле должно быть заполнено")
    })

    return(
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <h2>{status == "auth" ? 'Авторизация' : 'Регистрация'}</h2>
                <Formik
                    enableReinitialize = {true}
                    component={ status == "auth" ? Login : Register}
                    initialValues={status == "auth" ? initialLoginValues : initialRegisterValues }
                    validationSchema={status == "auth" ? validationForLogin : validationForRegister}
                    onSubmit={({email , password , name}, {resetForm}) => {

                        if(status == 'auth'){
                            logInUser(email , password)
                        }else if (status == "register" && name){
                            registerUser(name , email , password)
                        }

                        resetForm()
                    }}
                    />
                <div className={styles.link} onClick={handleClick}>{status == "auth" ? 'Создать аккаунт' : 'Войти в аккаунт'}</div>
            </div>
        </div>
    )
}