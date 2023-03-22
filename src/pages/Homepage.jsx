import {useContext, useEffect, useState} from "react";

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination"
import {SearchContext} from "../App";

export const Homepage = () => {
    const {searchValue} = useContext(SearchContext)
    const [pizzas , setPizzas] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [categoryIndex , setCategoryIndex] = useState(0)
    const [sortValue , setSortValue] = useState({
        name: 'популярности DESC' ,
        sortProperty: 'rating'
    })

    const [currentPage , setCurrentPage] = useState(1)
    const [quantityPerPage , setQuantityPerPage] = useState(4)

    useEffect(() => {
        setIsLoading(true)

        const category = categoryIndex > 0 ? `category=${categoryIndex}` : ""
        const sortBy = sortValue.sortProperty.replace("-","")
        const order = sortValue.sortProperty.includes('-') ? "asc" : "desc"
        const search = searchValue ? `&search=${searchValue}` : ""

        const response = fetch(`https://6411cd6f3f3b9490ddd84633.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(res => {
                    setPizzas(res)
                    setIsLoading(false)
                }
            )
            .catch(() => console.log('error'))
            window.scrollTo(0,0)
    } , [categoryIndex , sortValue , searchValue])

    const lastItemIndex = currentPage * quantityPerPage
    const firstItemIndex = lastItemIndex - quantityPerPage
    const itemsOnPage = pizzas.slice(firstItemIndex , lastItemIndex)

    const paginate = number => {
        setCurrentPage(number)
    }

    const displayPrevPage = (lastElem) => {
        setCurrentPage(prev => {
            const index = prev - 1

            if(index < 1) {
                return lastElem
            }else {
                return index
            }

        })
    }

    const displayNextPage = (pageNumbers) => {
        setCurrentPage(prev => {
            const index = prev + 1

            if(index > pageNumbers.length) {
                return pageNumbers[0]
            } else {
                return index
            }
        })
    }

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
                   itemsOnPage.map((pizza,i) => (
                       <PizzaBlock key={i} pizzaInfo={pizza}/>
                   ))
               }
           </div>
           <Pagination totalPizzas={pizzas.length}
                       quantityPerPage={quantityPerPage}
                       paginate={(number) => paginate(number)}
                       currentPage={currentPage}
                       displayPrevPage={displayPrevPage}
                       displayNextPage={displayNextPage}
           />
       </>
    )
}