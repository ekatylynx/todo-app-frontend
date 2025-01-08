import './index.scss';
import Button from '../Button';

const Categories = () => {
  return (
    <div className='categories'>
      <div className="categories-conteiner">
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
          <li className='categories-item'># all</li>
        </ul>
        <div>
        </div>
      </div>
    </div>
  );
}

export default Categories;