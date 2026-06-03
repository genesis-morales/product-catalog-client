import React, { useState } from 'react';
import { Alert } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import type { RegisterData } from '../../types/auth';
import '../AuthForms.scss';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const validateForm = () => {
    const errors: RegisterFormErrors = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      errors.name = 'El nombre es obligatorio.';
    } else if (trimmedName.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!trimmedEmail) {
      errors.email = 'El correo es obligatorio.';
    } else if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(trimmedEmail)) {
      errors.email = 'Ingresa un correo válido.';
    }

    if (!form.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else if (form.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!form.password_confirmation) {
      errors.password_confirmation = 'Debes confirmar la contraseña.';
    } else if (form.password !== form.password_confirmation) {
      errors.password_confirmation = 'Las contraseñas no coinciden.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange =
    (field: keyof RegisterData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));

      setFieldErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));

      if (error) {
        setError(null);
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      await register({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });
    } catch {
      setError('No se pudo crear la cuenta. Intenta con otro correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">Crear cuenta</h2>
        <p className="auth-form__subtitle">Regístrate para completar tu compra</p>
      </div>

      {error && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
      )}

      <form onSubmit={handleSubmit} className="auth-form__body" noValidate>
        <div className="auth-form__field">
          <label htmlFor="register-name" className="auth-form__label">
            Nombre completo
          </label>
          <input
            id="register-name"
            type="text"
            className={`auth-form__input ${fieldErrors.name ? 'auth-form__input--error' : ''}`}
            placeholder="Tu nombre"
            value={form.name}
            onChange={handleChange('name')}
            required
          />
          {fieldErrors.name && <span className="auth-form__error">{fieldErrors.name}</span>}
        </div>

        <div className="auth-form__field">
          <label htmlFor="register-email" className="auth-form__label">
            Correo electrónico
          </label>
          <input
            id="register-email"
            type="email"
            className={`auth-form__input ${fieldErrors.email ? 'auth-form__input--error' : ''}`}
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange('email')}
            required
            autoComplete="email"
          />
          {fieldErrors.email && <span className="auth-form__error">{fieldErrors.email}</span>}
        </div>

        <div className="auth-form__field">
          <label htmlFor="register-password" className="auth-form__label">
            Contraseña
          </label>
          <div className="auth-form__password-wrap">
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              className={`auth-form__input ${fieldErrors.password ? 'auth-form__input--error' : ''}`}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={handleChange('password')}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="auth-form__password-toggle"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {fieldErrors.password && (
            <span className="auth-form__error">{fieldErrors.password}</span>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="register-password-confirmation" className="auth-form__label">
            Confirmar contraseña
          </label>
          <div className="auth-form__password-wrap">
            <input
              id="register-password-confirmation"
              type={showPasswordConfirmation ? 'text' : 'password'}
              className={`auth-form__input ${fieldErrors.password_confirmation ? 'auth-form__input--error' : ''}`}
              placeholder="Repite tu contraseña"
              value={form.password_confirmation}
              onChange={handleChange('password_confirmation')}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="auth-form__password-toggle"
              onClick={() => setShowPasswordConfirmation(prev => !prev)}
              aria-label={
                showPasswordConfirmation
                  ? 'Ocultar confirmación de contraseña'
                  : 'Mostrar confirmación de contraseña'
              }
              aria-pressed={showPasswordConfirmation}
            >
              {showPasswordConfirmation ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {fieldErrors.password_confirmation && (
            <span className="auth-form__error">{fieldErrors.password_confirmation}</span>
          )}
        </div>

        <button type="submit" className="auth-form__btn" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth-form__switch">
        ¿Ya tienes cuenta?{' '}
        <button
          type="button"
          className="auth-form__switch-btn"
          onClick={onSwitchToLogin}
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
};