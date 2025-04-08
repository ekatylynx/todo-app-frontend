import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

interface DropdownMenuProps {
  trigger: React.ReactNode; // Элемент, при клике на который открывается меню
  children: React.ReactNode; // Содержимое меню (например, ссылки)
}
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне самого меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dropdown-menu">
      <div ref={triggerRef} className="dropdown-menu-trigger" onClick={handleTriggerClick}>
        {trigger}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div ref={menuRef} className="dropdown-menu-content">
            {children}
          </div>,
          document.body // Рендерим в корень DOM для поверхностного отображения
        )}
    </div>
  );
};

export default DropdownMenu;