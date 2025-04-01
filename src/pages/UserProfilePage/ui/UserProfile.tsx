import React from "react";
import './index.scss';

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";


const UserProfilePage: React.FC = () => {
	return (
		<div className='user-profile'>
			<h2 className="title-2 margin-element">My account</h2>
			<form className="account-form">
				<div className="input-element">
					<span className="input-label input-title">Фото</span>
					
				</div>
				<div className="input-element">
					<span className="input-label input-title">Имя</span>
					<Input defaultValue="Bob" />
				</div>
				<div className="input-element">
					<span className="input-label input-title">Email</span>
					<span>test@gmail.com</span>
				</div>
				<div className="input-element">
					<span className="input-label input-title">Удалить аккаунт</span>
					<span>Все ваши данные, включая задачи, проекты, комментарии и не только будут сразу удалены без возможности восстановления. </span>
					<Button text={"Удалить аккаунт"} variant="danger"  />
				</div>
			</form>
		</div>
	);
}

export default UserProfilePage;
