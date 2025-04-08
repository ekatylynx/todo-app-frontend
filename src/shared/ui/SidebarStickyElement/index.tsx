import React from 'react';
import './index.scss';

// import teamsIcon from '@/shared/assets/icons/teams.svg';

interface Props {
  leftImage?: React.ReactNode; // типизированный пропс для SVG
  name?: string;
  subtitle?: string;
  roundImage?: boolean;
  sidebarStickContainerPadding?: string; // Кастомный padding
  sidebarStickPadding?: string; // Кастомный padding (например, "20px" или "1rem 2rem")
}

const SidebarStickyElement: React.FC<Props> = ({ 
  leftImage,
  name,
  subtitle,
  roundImage,
  sidebarStickContainerPadding,
  sidebarStickPadding
}) => {
  return (
    <div 
      className="sidebar-sticky-container"
      style={sidebarStickContainerPadding ? { padding: sidebarStickContainerPadding } : undefined}
    >
      <div
        className='sidebar-stick'
        style={sidebarStickPadding ? { padding: sidebarStickPadding } : undefined}
      >
        <div className='sidebar-stick-icons'>
          <div className={roundImage ? 'icon-container-2-nopadding' : 'icon-container-2'}>
            <div className={roundImage ? 'icon-container-nopadding' : 'icon-container-svg'}>
              {leftImage ? leftImage : null}
            </div>
          </div>
          
          <div className='sidebar-stick-text-container'>
            <span className='sidebar-stick-title'>{name}</span>
            <span className='sidebar-stick-subtitle'>{subtitle}</span>
          </div>
        </div>
        <div>{'< >'}</div>
      </div>
    </div>
  );
};

export default SidebarStickyElement;

// Макет Layout для страниц, которые должны содержать Header и Sidebar.
