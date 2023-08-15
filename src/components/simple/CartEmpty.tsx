import {FC} from "react";
import { Link } from 'react-router-dom';
import {ROUTES} from "../../routes";

import cartEmptyImg from '../../assets/img/empty-cart.png';

export const CartEmpty:FC = () => (
    <div className="cart cart--empty">
        <h2>
            Корзина пустая <span>😕</span>
        </h2>
        <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to={ROUTES.HOME} className="button button--black">
            <span>Вернуться назад</span>
        </Link>
    </div>
);