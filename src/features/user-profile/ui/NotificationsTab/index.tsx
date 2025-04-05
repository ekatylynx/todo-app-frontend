import React from "react";

export const NotificationsTab: React.FC = () => {
  
  /*

  Компонент настройки уведомлений для пользователя
  В будущем необходимо будет реализовать:
  1. Подписка на активированную почту пользователя и рассылка уведомлений
  2. Отписка на почту пользователя по запросу пользователя
  3. ...
  
  */

  return (
    <div className="notifications-tab">
      <h3 className="input-label input-title">Notifications</h3>
      <p className="subtitle-gray">Notification settings</p>
    </div>
  );
};