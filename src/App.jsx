import React from 'react';

import {Categories} from "./components/Categories";
import {PizzaBlock} from "./components/PizzaBlock";
import {Header} from "./components/Header";
import {Sort} from "./components/Sort"

import pizzas from "./assets/pizzas.json"

import './scss/app.scss';

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className='content'>
                <div className='container'>
                    <div className='content__top'>
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className='content__title'>Все пиццы</h2>
                    <div className='content__items'>
                        { pizzas.map((pizza,i) => (
                            <PizzaBlock key={i} pizzaInfo={pizza}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
