import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = (props) => {
  return (
    <div className="categories">
      <ul>
          <li key='1' className='active'>
            Все
          </li>
          <li key='1' className='active'>
              Мясные
          </li>
          <li key='1' className='active'>
              Вегетарианская
          </li>
          <li key='1' className='active'>
              Гриль
          </li>
          <li key='1' className='active'>
              Острые
          </li>
          <li key='1' className='active'>
              Закрытые
          </li>
      </ul>
    </div>
  );
};
