import {FC , useState , useEffect} from "react";
import {GlobalSvgSelectors} from "../../assets/icons/globalSvgSelectors";
import {OrderHistoryView} from "../../components/smart/OrderHistoryView/OrderHistoryView";
import {auth} from "../../firebase"
import {MyInfo} from "../../components/smart/MyInfo/MyInfo";
import {LogOut} from "../../components/simple/LogOut/LogOut";
import {useAppSelector} from "../../core/hooks/hooks";

import styles from "./Profile.module.scss"

interface ITab {
    id: string,
    label: string,
    icon: string
}

const Profile: FC = () => {
    const tabs: ITab[] = [
        { id: "1", label: "Мои данные" , icon: 'profile-info' },
        { id: "2", label: "История заказов" , icon: 'dollar-sign' },
        { id: "3", label: "Выход" ,  icon: 'log-out' }
    ]
    const [index , setIndex] = useState<string>(tabs[0].id)
    const {user} = useAppSelector(state => state.user)

    const handleClick = (id: string) => {
        setIndex(id)
    }

    return(
        <>
            <h2 className={styles.welcomeText}>Добро пожаловать , {user?.name}!</h2>
            <div className={styles.wrapper}>
                <ul className={styles.list}>
                    { tabs && tabs.map(({label , id , icon}) => (
                        <li key={id} className={styles.listItem} onClick={() => handleClick(id)}>
                            <GlobalSvgSelectors id={icon} />
                            <p>{label}</p>
                        </li>
                    ))}
                </ul>
                { index == "1" &&
                    <MyInfo />
                }
                { index == "2" &&
                    <OrderHistoryView />
                }
                { index == "3" &&
                    <LogOut />
                }
            </div>
        </>
    )
}

export default Profile;