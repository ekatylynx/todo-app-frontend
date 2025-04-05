// src/pages/UserProfilePage/TabsRouter.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { User } from "@/entities/user/model";
import { ProfileTab } from "@/features/user-profile/ui/ProfileTab";
import { AccountTab } from "@/features/user-profile/ui/AccountTab";
import { NotificationsTab } from "@/features/user-profile/ui/NotificationsTab";

interface TabsRouterProps {
  user: User;
}

export const TabsRouter: React.FC<TabsRouterProps> = ({ user }) => {
  return (
    <Routes>
      <Route path="/my" element={<ProfileTab user={user} />} />
      <Route path="/account" element={<AccountTab user={user} />} />
      <Route path="/notifications" element={<NotificationsTab />} />
      {/* <Route path="*" element={<ProfileTab user={user} />} /> */}
    </Routes>
  );
};