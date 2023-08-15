import {FC} from "react";
import {useAppSelector , useAppDispatch} from "../../core/hooks/hooks";
import {setCategoryIndex} from "../../core/redux/slices/filterSlice";

export const Categories: FC = () => {
    const {categoryIndex} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
              {categories.map((category,i) => (
                  <li onClick={() => dispatch(setCategoryIndex(i))} key={i} className={ categoryIndex === i ? 'active' : ''}>
                      {category}
                  </li>
              ))}
          </ul>
        </div>
    );
};
