import {FC, useEffect, useState} from 'react';
import {ROUTES} from "../../routes";
import logoSvg from '../../assets/img/pizza-logo.svg';
import {Breadcrumbs , Search} from "../index";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../core/hooks/hooks";

const Header: FC = () => {
  const { items , totalPrice , totalQuantity } = useAppSelector((state) => state.cart)
  const {user} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.setItem('cart' , JSON.stringify(items))
    localStorage.setItem('totalPrice' , JSON.stringify(totalPrice))
    localStorage.setItem('totalQuantity' , JSON.stringify(totalQuantity))
  } , [items , totalPrice , totalQuantity])

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to={ROUTES.HOME}>
              <div className="header__logo">
                <img width="38" src={logoSvg} alt="Pizza logo" />
                <div>
                  <h1>React Pizza V2</h1>
                  <p>самая вкусная пицца во вселенной</p>
                </div>
              </div>
            </Link>
            <Search />
            <Link to={user ? ROUTES.PROFILE : ROUTES.LOGIN} className="header__profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor"
                   className="feather feather-home">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <p>{user ? 'Мой кабинет' : 'Войти'}</p>
            </Link>
            <div className="header__cart">
                <Link to={ROUTES.CART} className="button button--cart">
                  <span>{totalPrice} грн</span>
                  <div className="button__delimiter"></div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{totalQuantity}</span>
                </Link>
            </div>
          </div>
          <Breadcrumbs />
        </div>
      </div>
    </>
  );
};

export default Header
