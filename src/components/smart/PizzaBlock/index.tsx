import {FC , useState , useEffect} from 'react';
import {addItems} from "../../../core/redux/slices/cartSlice";
import {useAppSelector , useAppDispatch} from "../../../core/hooks/hooks";
import {Link} from "react-router-dom";
import {IItem} from "../../../core/redux/slices/cartSlice";
import {GlobalSvgSelectors} from "../../../assets/icons/globalSvgSelectors";

interface IPizza {
    id: string,
    imageUrl: string,
    title: string,
    price: number,
    sizes: number[],
    types: number[]
}

export const PizzaBlock: FC<{pizzaInfo: IPizza}> = ({pizzaInfo}) => {
    const {id , imageUrl , title , price , sizes , types} = pizzaInfo

    const product = useAppSelector(state => state.cart.items.find( item => item.id === id))
    const dispatch = useAppDispatch()
    const count = product ? product.count : 0

    const typeNames = ['тонкое', 'традиционное'];

    const [activeType , setActiveType] = useState<number>(0)
    const [activeSize , setActiveSize] = useState<number>(0)
    const [data , setData] = useState<IItem>()

    useEffect(() => {
        setData(createObject(26))
    },[])

    const handleClick = (i:number , size: number) => {
        setActiveSize(i)
        let newObject!: IItem

        switch (size) {
            case 26:
                newObject = createObject(size)
                break
            case 30:
                newObject = createObject(size, 100)
                break
            case 40:
                newObject = createObject(size, 200)
                break
        }
        setData(newObject)
    }

    const createObject = (size:number, value: number = price) => {
        const data: IItem = {
            id,
            imageUrl,
            title,
            price: size == 26 ? value : price + value,
            type: typeNames[activeType],
            size: size,
            count: 0
        }

        return data
    }

    const onClickAdd = () => {
        dispatch(addItems(data!))
    }

    return (
        <>
            <div className="pizza-block-wrapper">
                <div className="pizza-block">
                    <Link to={`pizza/${id}`}>
                        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                        <h4 className="pizza-block__title">{title}</h4>
                    </Link>
                    <div className="pizza-block__selector">
                        <ul>
                            {types.map((type) => (
                                <li onClick={() => setActiveType(type)} key={type} className={activeType === type ? 'active' : ''}>{typeNames[type]}</li>
                            ))}
                        </ul>
                        <ul>
                            {sizes.map((size,i) => (
                                <li onClick={() => handleClick(i , size) } key={i} className={activeSize === i ? 'active' : ''}>{size}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">{data ? data.price : price} грн</div>
                        <button onClick={onClickAdd}
                                className="button button--outline button--add"
                                >
                            <GlobalSvgSelectors id={"plus"} />
                            <span>Добавить</span>
                            { count > 0 &&
                                <i>{count}</i>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
