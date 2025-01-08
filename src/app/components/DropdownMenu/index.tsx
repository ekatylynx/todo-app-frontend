import React, { useEffect, useRef } from "react";
import DropdownFormDeadline from "../DropdownFormDeadline";

import './index.scss';

const DropdownMenu = ( { title, icon, children}) => {
  const to = useRef();

  useEffect(() => {
    to.current = setTimeout(() => onClose(), 4000);

    return () => clearTimeout(to.current);
  }, [type, onClose]);

  return (
    <div>
      <DropdownFormDeadline />
    </div>
  );
}

export default DropdownMenu;