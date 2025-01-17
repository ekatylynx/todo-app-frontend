import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './index.scss';

interface FormData {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  return (
    <div className="auth-services">
      <div className='auth-meow'>
        <span>OR CONTINUE WITH</span>
      </div>
      <div className='auth-list'>
        <Button text='Gmail' />
        <Button text='GitHub' />
      </div>
    </div>
  );
};

export default RegisterPage;
