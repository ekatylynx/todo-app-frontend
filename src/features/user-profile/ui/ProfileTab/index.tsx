import React from "react";
import { User } from "@/entities/user/model";

import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";

import iconUser from '@/shared/assets/icons/user2.png';
import './index.scss';

interface ProfileTabProps {
  user: User;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  return (
    <div className="user-profile">
		<h2 className="title-2 margin-element">My account</h2>
		<form className="account-form">
			<div className="input-element">
				<span className="input-label input-title">Avatar</span>
				<img src={user.avatar}></img>
        <div className="user-avatar-container">
					<div className="user-avatar"><img src={iconUser}></img></div>
					<div>
						<div className="user-btns">
							<Button variant="gray" text={"Change photo"} />
							<Button variant="danger" text={"Delete photo"} />
						</div>
							<span className="subtitle-gray">Select a photo up to 4MB in size.</span>
					</div>
        </div>
			</div>
			<div className="input-element">
				<span className="input-label input-title">Name</span>
				<Input defaultValue={user.name} />
			</div>
			<div className="input-element">
				<span className="input-label input-title">Email</span>
				<span className="subtitle-gray">{user.email}</span>
			</div>
			<div className="input-element">
				<span className="input-label input-title">Account registration date</span>
				<span className="subtitle-gray">{user.date_joined_readable}</span>
			</div>
			<div className="input-element">
				<div className="button-container">
					<Button text={"Update profile"} variant="primary" />
				</div>
			</div>
		</form>
	</div>
  );
};