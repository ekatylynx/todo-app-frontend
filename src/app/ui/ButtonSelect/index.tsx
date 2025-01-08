import './index.scss';

const ButtonSelect = ({ children, ...props }) => {
  return (
    <div>
      <div className='mainpage'>
        {children}
        <button></button>
      </div>
    </div>
  );
}

export default ButtonSelect;