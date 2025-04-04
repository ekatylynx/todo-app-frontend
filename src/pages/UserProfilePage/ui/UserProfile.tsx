import React, { useEffect, useState } from "react";
import './index.scss';

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import type { User } from "@/entities/user/model";
import { getUserData } from "@/entities/user/api";

const UserProfilePage: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        if (data) {
          setUser(data);
        }
      } catch (err) {
        setError("Failed to load user data");
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

	// const formatDate = (dateString: string) => {
	//   const formatter = new Intl.DateTimeFormat('en', {
	//     weekday: 'short',
	//     year: 'numeric',
	//     month: 'numeric',
	//     day: 'numeric',
	//     hour: 'numeric',
	//     minute: 'numeric',
	//     hour12: false,
	//   });
	//   return formatter.format(new Date(dateString));
	// };

  if (isLoading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="no-data">No user data available</div>;
  }

	return(
		<div className="user-profile">
		<h2 className="title-2 margin-element">My account</h2>
		<form className="account-form">
			<div className="input-element">
				<span className="input-label input-title">Avatar</span>
				<img src={user.avatar}></img>
			</div>
			<div className="input-element">
				<span className="input-label input-title">Имя</span>
				<Input defaultValue={user.name} />
			</div>
			<div className="input-element">
				<span className="input-label input-title">Email</span>
				<span>{user.email}</span>
			</div>
			<div className="input-element">
				<span className="input-label input-title">Date registr</span>
				<span>{user.date_joined_readable}</span>
			</div>
			<div className="input-element">
				<span className="input-label input-title">Удалить аккаунт</span>
				<span>Все ваши данные, включая задачи, проекты, комментарии и не только будут сразу удалены без возможности восстановления. </span>
				<Button text={"Удалить аккаунт"} variant="danger" />
			</div>
		</form>
	</div>
	);
}

export default UserProfilePage;
