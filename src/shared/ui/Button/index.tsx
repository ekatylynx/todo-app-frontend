import React from "react";
import './index.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: string;
  iconLarge?: boolean;
  iconMedium?: boolean;
  backgroundEmpty?: boolean;
  textColor?: string;
  textWeight?: React.CSSProperties["fontWeight"];
  classNameAdd?: string;
  width?: "full";
  variant?: 'primary' | 'danger' | 'outline' | 'gray';
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconLarge,
  iconMedium,
  backgroundEmpty,
  textColor,
  textWeight,
  classNameAdd,
  style,
  disabled,
  variant = 'primary',
  width,
  ...props
}) => {

  // Формирование классов 
  const buttonClass = ["btn-medium"];

  if (backgroundEmpty)
    buttonClass.push("btn-background-empty");

  if (width === "full") {
    buttonClass.push("btn-full-width"); // Класс для ширины 100%
  }

  if (classNameAdd)
    buttonClass.push(classNameAdd);

  const iconClass = [];

  if (iconMedium) {
    iconClass.push('icon-medium')
  } else if (iconLarge) {
    iconClass.push('icon-large')
  }

  return (
    <button
      className={buttonClass.join(" ") + ' ' + `${variant}`}
      style={{ color: textColor, fontWeight: textWeight, ...style }}
      disabled={disabled}
      {...props}
    >
      {icon && <img className={iconClass.join(' ')} src={icon} alt="icon" />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
