import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import './index.scss';

import { signup } from '@/features/auth/api';
import { isLogined } from '@/shared/api/api';

import type { ApiResponse } from '@/entities/todo/model';
 
/**
 * TODO:
 * - Подчистить все неиспользуемые вещи и подчистить старые комментарииы
 */

interface FormData {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitMessage, setSubmitMessage] = useState<string>('');

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

      if (Object.keys(errors).length > 0) return;

      setIsSubmitting(true);
      setSubmitError('');
      setSubmitMessage('');

      try {
        const result = await signup(formData) as ApiResponse;
        
        if (result?.message) {
          setSubmitMessage(result.message);
          console.log(result.message);
        }
        
        navigate("/auth/signin");
      } catch (error) {
        let errorMessage = 'Registration failed';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
          errorMessage = String(error.message);
        }
        setSubmitError(errorMessage);
        console.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, errors, navigate]
  );

  return (
    <section className="registration-page">
      <div className='info-container'>
        <p>Logo</p>
        <p>Test</p>
      </div>
      <div className='function-container'>
      <Link className='auth-link' to="/auth/signin">Sign In</Link>
        {/* <span></span> */}
        <div className='auth'>
          <span className='title-2xl'>Create your account</span>
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
            <Button text={isSubmitting ? 'Processing...' : 'Sign up'} textColor='white' type="submit" disabled={Object.keys(errors).length > 0 || isSubmitting || submitError !== ''} />
            {submitMessage}
            <span className='terms-text'>By clicking continue, you agree to our Terms of Service and Privacy Policy.</span>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
