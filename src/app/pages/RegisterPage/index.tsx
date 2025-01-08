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

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Валидация входных данных
  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <section className="registration-page">
      <div className='info-container'>
        <p>Logo</p>
        <p>Biba boba test yoba</p>
      </div>
      <div className='function-container'>
        <a className='auth-link' href="./login">Login</a>
        {/* <span></span> */}
        <div className='auth'>
          <span className='title-2xl'>Create an account</span>
          <span className='text-normal-gray'>Enter your email and password below to create your account</span>
          <form className='auth-form' onSubmit={handleSubmit}>
            <div> 
              {/* <label htmlFor="email">Email</label> */}
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='email@example.com'
              />
              {errors.email && <p className="auth-error">{errors.email}</p>}
            </div>
            <div>
              {/* <label htmlFor="password">Password</label> */}
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='password'
              />
              {errors.password && <p className="auth-error">{errors.password} </p>}
            </div>
            <Button text='Sign up' textColor='white' type="submit" />
          </form>
        </div>

      </div>
    </section>
  );
};

export default RegisterPage;
