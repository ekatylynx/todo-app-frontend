// БЫЛО
import { MyDatePicker } from "../DatePicker";
import Categories from "../Categories";
import FiltersDate from "../FiltersDate";
// СТАЛО
import Button from '@/shared/ui/Button';

import IconAddElement from '@/shared/assets/icons/icon-add-el.svg';

import { ScrollArea } from "@/shared/components/ui/scroll-area"


import './index.scss';

const Sidebar = () => {
  return (
    <ScrollArea className='sidebar'>
      <div className="sidebar-nav">
        <div>
        </div>
        <div className="calendar-container">
          <div className="date-picker-lib">
            <MyDatePicker />
          </div>
          {/* <Calendar /> */}
          <div className="container-padding">
            <Button 
              text={'Add task'}
              icon={IconAddElement}
              textColor={'white'}
              textWeight={'normal'} 
              classNameAdd={'btn-add-todo'}
              iconMedium
            />
          </div>
          <FiltersDate />
          <Categories />
        </div>
      </div>
    </ScrollArea>
  );
}

export default Sidebar;