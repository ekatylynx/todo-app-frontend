import React, { useEffect, useState } from "react";
import './index.scss';

import { Tabs } from "@/widgets/Tabs";
import { TabsRouter } from "./TabsRouter";
import type { User } from "@/entities/user/model";
import { getUserData } from "@/entities/user/api";

const tabs = [
	{ id: "info", label: "Profile", path: "my" },
	{ id: "account", label: "Account", path: "account" },
	{ id: "notifications", label: "Notifications", path: "notifications" },
];

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

	return (
		<div className="user-settings-page">
			<div>
				<h2 className="title-2">Settings</h2>
				<span className="subtitle-gray">Manage your account settings and set e-mail preferences.</span>
			</div>
			<hr className="hr-settings" />
			<div className="user-settings-page-container">
				<div className="tabs-list">
					<Tabs tabs={tabs} basePath="/profile" />
				</div>

				<div className="tab-content">
					{/* <h2 className="title-2">My Account</h2> */}
					<TabsRouter user={user} />
				</div>
			</div>
		</div>
	);
}

export default UserProfilePage;
