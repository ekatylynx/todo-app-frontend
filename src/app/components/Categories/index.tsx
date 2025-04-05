import './index.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { allCategoriesUser } from '@/entities/category/api';

import Button from '@/shared/ui/Button';
import IconAddElement from '@/shared/assets/icons/icon-add-el.svg';

import type { Categories } from '@/entities/category/model';

const Categories: React.FC = () => {
const [category, setCategory] = useState<Categories[]>([]);

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
            icon={IconAddElement}
            textColor={'white'}
            textWeight={'normal'}
            classNameAdd={'btn-add-todo'}
            iconMedium
            width={'full'}
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