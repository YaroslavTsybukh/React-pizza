import {FC} from "react";
import styles from "./LogOut.module.scss"
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../core/hooks/hooks";
import {loginOut} from "../../../core/redux/slices/userSlice";

export const LogOut: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleDeleteUser = async() => {
        try {
            dispatch(loginOut())

            localStorage.removeItem("user")
            navigate("/" , {replace: true})
        }catch(e){
            if(e instanceof Error){
                console.log(e.message)
            } else if (typeof e == "string"){
                console.log(e)
            }
        }
    }

    return(
        <div className={styles.wrapper}>
            <h3 className={styles.heading}>Вы действительно хотить выйти?</h3>
            <button onClick={handleDeleteUser} className={styles.button} type="button">Подтвердить</button>
        </div>
    )
}