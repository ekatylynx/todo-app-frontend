import React from 'react';

import { AuthForm } from '@/features/auth/ui/AuthForm';

import '@/pages/RegisterPage/ui/index.scss';
import { signup } from '@/features/auth/api';

const RegisterPage: React.FC = () => {

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleSubmit = async (data: { email: string; password: string }) => {
    await signup(data); // Вызов API регистрации
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
