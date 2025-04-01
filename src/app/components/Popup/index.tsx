// import React, { useEffect, useRef } from "react";
import './index.scss';

// const Popup = ({ type, text, onClose }) => {
  const Popup = () => {
  // const to = useRef();

  // useEffect(() => {
  //   to.current = setTimeout(() => onClose(), 4000);

  //   return () => clearTimeout(to.current);
  // }, [type, onClose]);

    return (
      <div>
        {/* {text && type ? (
          <section className="popup-info">
            <div
              className={
                type === 'error'
                  ? "popup-info-notice-error"
                  : "popup-info-notice"
              }
            >
              <span>{text}</span>
              <span title="Закрыть" onClick={onClose}>×</span>
            </div>
          </section>
        )  : null} */}
      </div>
    );
};

export default Popup;