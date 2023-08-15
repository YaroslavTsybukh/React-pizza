import { FC } from "react";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../routes";

import styles from "./Breadcrumbs.module.scss"

export const Breadcrumbs: FC = () => {
    const {pathname} = useLocation()
    let currentLink = ""
    console.log(pathname)

    const link = pathname.split('/')
        .filter(crumb => crumb !== "")
        .map((crumb , i) => {
            currentLink += `/${crumb}`

            return (
                <div key={i} className={styles.crumb}>
                    <Link to={currentLink}>{crumb}</Link>
                </div>
            )
        })

    return (
        <div className={styles.crumbs}>
            { pathname !== "/"
                ? <div className={styles.crumb}>
                    <Link to={ROUTES.HOME}>home</Link>
                </div> : null}
            {link}
        </div>
    )
}