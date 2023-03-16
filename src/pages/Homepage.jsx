import {useEffect, useState} from "react";

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";

export const Homepage = () => {
    const [pizzas , setPizzas] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [categoryIndex , setCategoryIndex] = useState(0)
    const [sortValue , setSortValue] = useState({
        name: 'популярности DESC' ,
        sortProperty: 'rating'
    })

    useEffect(() => {
        setIsLoading(true)

        const category = categoryIndex > 0 ? `category=${categoryIndex}` : ""
        const sortBy = sortValue.sortProperty.replace("-","")
        const order = sortValue.sortProperty.includes('-') ? "asc" : "desc"

        const response = fetch(`https://6411cd6f3f3b9490ddd84633.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => res.json())
            .then(res => {
                    setPizzas(res)
                    setIsLoading(false)
                }
            )
            .catch(() => console.log('error'))
            window.scrollTo(0,0)
    } , [categoryIndex , sortValue])

    return(
       <>
           <div className='content__top'>
               <Categories value={categoryIndex} changeState={(id) => setCategoryIndex(id)}/>
               <Sort value={sortValue} changeState={(sortItem) => setSortValue(sortItem)}/>
           </div>
           <h2 className='content__title'>Все пиццы</h2>
           <div className='content__items'>
               {isLoading ?
                   [...new Array(5)].map((_,i) => <Skeleton key={i} />)
                   :
                   pizzas.map((pizza,i) => (
                       <PizzaBlock key={i} pizzaInfo={pizza}/>
                   ))
               }
           </div>
       </>
    )
}