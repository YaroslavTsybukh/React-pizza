import {FC , useEffect} from "react";
import {fetchPizza} from "../../core/redux/slices/fetchPizzaSlice";
import {useAppSelector , useAppDispatch} from "../../core/hooks/hooks";
import {useParams} from "react-router-dom";
import {Accordion} from "../../components";

import styles from "./Pizza.module.scss"

const Pizza:FC = () => {
    const {item} = useAppSelector((state) => state.pizza)
    const dispatch = useAppDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchPizza(id!))
    }, [])

    return(
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <img className={styles.img} src={item.imageUrl} alt={item.title}/>
            </div>
            <div className={styles.block}>
                <h1 className={styles.heading}>{item.title}</h1>
                <Accordion data={item}/>
            </div>
        </div>
    )
}

export default Pizza