export const Categories = ({value , changeState}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
              {categories.map((category,i) => (
                  <li onClick={() => changeState(i)} key={i} className={ value === i ? 'active' : ''}>
                      {category}
                  </li>
              ))}
          </ul>
        </div>
    );
};
