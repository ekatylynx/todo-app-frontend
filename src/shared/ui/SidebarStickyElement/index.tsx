import React from 'react';
import './index.scss';

// import teamsIcon from '@/shared/assets/icons/teams.svg';

interface Props {
  leftImage?: React.ReactNode; // типизированный пропс для SVG
  name?: string;
  subtitle?: string;
  roundImage?: boolean;
}

const SidebarStickyElement: React.FC<Props> = ({ leftImage, name, subtitle, roundImage }) => {
  return (
    <div className="team-container">
      <div className='team'>
        <div className='team-icons'>
          <div className={roundImage ? 'icon-container-2-nopadding' : 'icon-container-2'}>
            <div className={roundImage ? 'icon-container-nopadding' : 'icon-container-svg'}>
              {leftImage ? leftImage : null}
            </div>
          </div>
          
          <div className='team-text-container'>
            <span className='team-title'>{name}</span>
            <span className='team-subtitle'>{subtitle}</span>
          </div>
        </div>
        <div>{'< >'}</div>
      </div>
    </div>
  );
};

export default SidebarStickyElement;

// Макет Layout для страниц, которые должны содержать Header и Sidebar.
