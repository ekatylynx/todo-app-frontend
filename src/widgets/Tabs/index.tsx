import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
  basePath: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, basePath }) => {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={`${basePath}/${tab.path}`}
          className={({ isActive }) => (isActive ? "tab tab--active" : "tab")}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};