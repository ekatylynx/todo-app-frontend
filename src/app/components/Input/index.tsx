import React from "react";
import './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  isChangeInput?: boolean;
  className?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  isChangeInput = false,
  className = "",
  ...props
}) => {

  return (
    <input 
      {...props} // передаем все остальные пропсы, включая onChange
      placeholder={placeholder} 
      value={value} // значение поля должно быть привязано
      className={(isChangeInput ? "channge-input" : "input") + className}
      onChange={onChange} // передаем onChange в input
    />
  );
};

export default Input;
