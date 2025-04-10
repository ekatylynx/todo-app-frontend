import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Transition } from 'react-transition-group';

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
      <div 
        ref={triggerRef} 
        className="dropdown-menu-trigger" 
        onClick={() => {
        handleTriggerClick();
        }}>
        {trigger}
      </div>
      {ReactDOM.createPortal(
          <Transition in={isOpen} timeout={300} >
            {(state) => (
              <div ref={menuRef} className={`dropdown-menu-content ${state}`}>
                {children}
              </div>
              )}
          </Transition>,
          document.body
        )}
    </div>
  );
};

export default DropdownMenu;