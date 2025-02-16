import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, redirect, Navigate } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import './index.scss';

import { signin, isLogined, allTodos } from '../../../app/data/api';
 
interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (isLogined()) {
      console.log("Redirect to /");
      navigate("/");
    }
  }, [isSubmitting]);

  // Валидация входных данных
  const validate = useCallback((name: keyof FormData, value: string) => {
    const newErrors: Partial<FormData> = { ...errors };

    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Email address is invalid';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  }, [errors]);

  // Обработчик изменений в input
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      validate(name as keyof FormData, value); // Валидация при изменении
    },
    [validate]
  );

  // Обработчик отправки формы
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        try {
          // await login(formData.email, formData.password);
          await signin(formData);
          setSubmitError('');
        } catch (error) {
          setSubmitError('Failed to login. Please check your credentials.');
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [formData, errors]
  );

  return (
    <section className="registration-page">
      <div className='info-container'>
        <p>Logo</p>
        <p>Biba boba test yoba</p>
      </div>
      <div className='function-container'>
        <a className='auth-link' href="./login">Sign up</a>
        {/* <span></span> */}
        <div className='auth'>
          <span className='title-2xl'>Login in your account</span>
          <span className='text-normal-gray'>Enter your email and password below to create your account</span>
          <form className='auth-form' onSubmit={handleSubmit}>
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
            {submitError && <p className="auth-error">{submitError}</p>}
            <Button text='Sign up' textColor='white' type="submit" disabled={isSubmitting} />
      {/* {todos.map(({ id, created_at_moscow }) => {
        return (
          <div key={id}>{id} {created_at_moscow}</div>
        );
      })} */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
