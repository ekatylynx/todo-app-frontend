import React from 'react';

import { AuthForm } from '@/features/auth/ui/AuthForm';
import { FormData } from '@/features/auth/types';
import '@/pages/RegisterPage/ui/index.scss';
import { signin, signup } from '@/features/auth/api';

const RegisterPage: React.FC = () => {

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSubmit = async (data: FormData) => {
    try {
      await signup(data);
      await signin(data);
      // console.log(loginData);
    } catch (error) {
      console.error("Registration error:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  };

  return (
    <AuthForm
      action={handleSubmit}
      fields={fields}
      title={'Create your account'}
      subtitle={'Enter your email and password below to create your account'}
      linkTitle={'Sign In'}
      linkAuth={'/auth/signin'}
      textButton={'Sign Up'}
    />
  );
};

export default RegisterPage;
