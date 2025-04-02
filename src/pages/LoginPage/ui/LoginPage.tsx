import React from 'react';

import { AuthForm } from '@/features/auth/ui/AuthForm';

import '@/pages/RegisterPage/ui/index.scss';
import { signin } from '@/features/auth/api';

const LoginPage: React.FC = () => {

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSubmit = async (data: { email: string; password: string }) => {
    await signin(data); // Вызов API регистрации
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      fields={fields}
      title={'Login in your account'}
      subtitle={'Enter your email and password below to sign in your account'}
      linkTitle={'Sign Up'}
      linkAuth={'/auth/signup'}
      textButton={'Sign in'}
    />
  );
};

export default LoginPage;
