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
  ...props
}) => {

  // Формирование классов 
  const buttonClass = ["btn-medium"];

  if (backgroundEmpty)
    buttonClass.push("btn-background-empty");

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
      className={buttonClass.join(" ")}
      style={{ color: textColor, fontWeight: textWeight, ...style }}
      {...props}
    >
      {icon && <img className={iconClass.join(' ')} src={icon} alt="icon" />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
