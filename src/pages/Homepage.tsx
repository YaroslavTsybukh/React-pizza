import { FC , useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAppSelector , useAppDispatch} from "../core/hooks/hooks";
import qs from "qs"
import { fetchPizzas } from "../core/redux/slices/fetchPizzasSlice";

import {Categories , Sort , Skeleton , PizzaBlock , Pagination , FetchError} from "../components";

export const Homepage:FC = () => {
    const dispatch = useAppDispatch()
    const {filter: {categoryIndex , searchValue} , sort: {sort} , pagination: {currentPage , quantityPerPage} , pizzas: {status , items: pizzas}} = useAppSelector(state => state)
    const navigate = useNavigate()
    const [isMounted , setIsMounted] = useState(false)

    const fetchData = () => {
        const category = categoryIndex > 0 ? `category=${categoryIndex}` : ""
        const sortBy = sort.sortProperty.replace("-","")
        const order = sort.sortProperty.includes('-') ? "asc" : "desc"
        const search = searchValue ? `&search=${searchValue}` : ""

        dispatch(
            fetchPizzas({
            category,
            sortBy,
            order,
            search
        }))
    }

    useEffect(() => {
        fetchData()
        window.scrollTo(0,0)
    } , [categoryIndex , sort , searchValue])

    useEffect(() => {
        if(isMounted) {
            const urlString = qs.stringify({
                'category': categoryIndex,
                'sortBy': sort.sortProperty,
                'currentPage': currentPage
            })

            navigate(`?${urlString}`)
        }

        setIsMounted(true)
    }, [categoryIndex , sort , currentPage])

    const lastItemIndex = currentPage * quantityPerPage
    const firstItemIndex = lastItemIndex - quantityPerPage
    const itemsOnPage = pizzas.slice(firstItemIndex , lastItemIndex)
console.log(itemsOnPage)
    return(
       <>
           <div className='content__top'>
               <Categories />
               <Sort />
           </div>
           <h2 className='content__title'>Все пиццы</h2>

           {status === 'error' ? <FetchError />:
               <div className="content__items">
                   {status === 'loading' ? [...new Array(5)].map((_,i) => <Skeleton key={i} />) :
                   itemsOnPage.map((pizza,i) => (
                       <PizzaBlock key={i} pizzaInfo={pizza}/>
                   ))}
               </div>
           }
           <Pagination totalPizzas={pizzas.length}
                       quantityPerPage={quantityPerPage}
                       currentPage={currentPage}
           />
       </>
    )
}