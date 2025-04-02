// src/features/auth/ui/AuthForm/index.tsx
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { FormData } from "../../types";
import { isLogined } from "@/shared/api/api";
// import { signin } from "../../api";

interface AuthFormProps {
  title: string;
  fields: { name: string; label: string; type: string }[];
  linkAuth: string;
  linkTitle: string;
  subtitle: string;
  textButton: string;
  onSubmit: (data: FormData) => Promise<void>;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  linkAuth,
  linkTitle,
  subtitle,
  textButton,
  onSubmit
}) => {
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogined()) {
      console.log("Redirect to /");
      navigate("/");
    }
  }, [isSubmitting]);

  // Валидация из LoginPage
  const validate = useCallback(
    (name: keyof FormData, value: string) => {
      const newErrors: Partial<FormData> = { ...errors };

      if (name === "email") {
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email address is invalid";
        } else {
          delete newErrors.email;
        }
      }

      if (name === "password") {
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
      }

      setErrors(newErrors);
    },
    [errors]
  );

  // Обработчик изменений из LoginPage
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      validate(name as keyof FormData, value);
    },
    [validate]
  );

  // Обработчик отправки из LoginPage, адаптированный под пропс onSubmit
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(formData);
          setSubmitError("");
        } catch(err) {
          // console.log("!!!!!!!!!!!!!", err)
          setSubmitError(err?.message ? err.message : "Failed to submit. Please check your credentials.");
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
        <p>test</p>
      </div>
      <div className="function-container">
        <Link className='auth-link' to={linkAuth}>{linkTitle}</Link>
        <div className="auth">
          <span className='title-2xl'>{title}</span>
          <span className='text-normal-gray'>{subtitle}</span>
            <form className="auth-form" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name} className="auth-form__field">
                  <Input
                    placeholder={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name as keyof FormData] || ""}
                    onChange={handleChange}
                  />
                  {errors[field.name as keyof FormData] && (
                  <span className="auth-error">
                    {errors[field.name as keyof FormData]}
                  </span>
                )}
                </div>
              ))}
              <Button 
                text={isSubmitting ? 'Processing...' : textButton} 
                type="submit"
                disabled={isSubmitting}
              >Submit</Button>
              {submitError && <span className="auth-error">{submitError}</span>}
              <span className='terms-text'>By clicking continue, you agree to our Terms of Service and Privacy Policy.</span>
            </form>
        </div>
      </div>
    </section>
  );
};