import {FC , useState} from "react";
import styles from "./Accordion.module.scss"

interface IProps {
    data: {
        id?: string,
        imageUrl?: string,
        title?: string,
        types?: number[],
        sizes?: number[],
        price?: number,
        category?: number,
        rating?: number,
        composition?: string
    }
}

export const Accordion: FC<IProps> = ({data: {composition}}) => {
    const [active , setActive] = useState<boolean>(false)

    const handleClick = () => {
        setActive(active => !active)
    }

    return (
        <div className={styles.accordion}>
            <div className={active ? styles.accordionActive + " " + styles.accordionHeading : styles.accordionHeading}
                 onClick={handleClick}
            >
                <p><b>Состав:</b></p>
            </div>
            {active && <p className={styles.accordionText}>{composition}</p>}
        </div>
    )
}