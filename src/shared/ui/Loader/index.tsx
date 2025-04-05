import React from "react";
import './index.scss';

import loaderIcon from '@/shared/assets/icons/loader.svg';

const Loader: React.FC = () => {

  return (
    <div className="loader">
      <img className="loader-icon" src={loaderIcon}></img>
      <span className="loader-text">Loading...</span>
    </div>
  );
};

export default Loader;
