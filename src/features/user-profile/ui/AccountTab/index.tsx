import React, { useState } from "react";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { User } from "@/entities/user/model";
// import { updateUser } from "../../api";

interface AccountTabProps {
  user: User;
}

export const AccountTab: React.FC<AccountTabProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  console.log("boba")
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // await updateUser({ name });
  //     alert("Profile updated");
  //   } catch (err) {
  //     setError("Failed to update profile");
  //   }
  // };

  return (
    <div className="account-tab">
      <h2 className="title-2 margin-element">Account Settings</h2>
      <form className="account-form">
        <span className="input-label input-title">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        {/* {error && <p className="error">{error}</p>} */}
        <div className="button-container">
          <Button text="Save" type="submit" />
        </div>
      </form>
      <div className="input-element delete-profile">
				<span className="input-label input-title">Delete my account</span>
				<span className="subtitle-gray">All your data, including personal data, tasks and more, will be immediately deleted without the possibility of recovery. </span>
				<div className="button-container">
					<Button text={"Delete account"} variant="danger" />
				</div>
			</div>
    </div>
  );
};