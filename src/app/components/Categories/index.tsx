import './index.scss';
import Button from '../Button';
import { allCategoriesUser, allTodos } from '@/app/data/api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Categories: React.FC = () => {
const [category, setCategory] = useState([]);

useEffect(() => {
    allCategoriesUser().then((data) => {
      if (data && Array.isArray(data)) {
        // const id = 6;
        // const categoryName = data.filter((item) => item.id === id)[0]?.title || "Unknown";
        // console.log(`Название шестой категори: ${categoryName}`);
        setCategory(data);
      }
    })
    .catch((err) => {
      console.error("DATA ERROR", err)
    });
  }, []);

  return (
    <div className='categories'>
      <div className="categories-container">
        <h2 className='categories-title'>Категории</h2>
        <div className='container-padding'>
          <Button
            text={'Add category'}
            icon={'/src/assets/icons/icon-add-el.svg'}
            textColor={'white'}
            textWeight={'normal'}
            classNameAdd={'btn-add-todo'}
            iconMedium
          />
        </div>

        <ul>
        {category.map(({id, title}) => {
          return (
            <li key={id}>
              <Link to={`/categories/${id}`} className='categories-item'>{`# ${title}`}</Link>
            </li>
          )
        })}
        </ul>
        <div>
        </div>
      </div>
    </div>
  );
}

export default Categories;