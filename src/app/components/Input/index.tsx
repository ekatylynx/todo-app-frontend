import React from "react";
import './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  ...props
}) => {

  return (
    <input 
      {...props} // передаем все остальные пропсы, включая onChange
      placeholder={placeholder} 
      value={value} // значение поля должно быть привязано
      className="input"
      onChange={onChange} // передаем onChange в input
    />
  );
};

export default Input;
