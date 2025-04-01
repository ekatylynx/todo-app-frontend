// import React, { useEffect, useRef } from "react";
import DropdownFormDeadline from "../DropdownFormDeadline";

import './index.scss';
// interface DropdownMenuProps {
//   title: string;
//   icon?: React.ReactNode;
//   children: React.ReactNode;
//   onClose: () => void;
//   type?: string;
// }

// const DropdownMenu = ( { title, icon, children}: DropdownMenuProps) => {
const DropdownMenu = () => {
  // const to = useRef<NodeJS.Timeout>();

  // useEffect(() => {
  //   to.current = setTimeout(() => onClose(), 4000);

  //   return () => clearTimeout(to.current);
  // }, [onClose]);

  return (
    <div>
      <DropdownFormDeadline />
    </div>
  );
}

export default DropdownMenu;