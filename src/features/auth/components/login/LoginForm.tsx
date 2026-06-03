import React, { useState } from 'react';
import { Alert } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import type { LoginCredentials } from '../../types/auth';
import '../AuthForms.scss';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({
        email: form.email.trim(),
        password: form.password,
      });
    } catch {
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">Iniciar sesión</h2>
        <p className="auth-form__subtitle">Ingresa a tu cuenta para continuar</p>
      </div>

      {error && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
      )}

      <form onSubmit={handleSubmit} className="auth-form__body">
        <div className="auth-form__field">
          <label htmlFor="login-email" className="auth-form__label">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-form__input"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
          />
        </div>

        <div className="auth-form__field">
          <label htmlFor="login-password" className="auth-form__label">
            Contraseña
          </label>

          <div className="auth-form__password-wrap">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="auth-form__input"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="current-password"
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
        </div>

        <button type="submit" className="auth-form__btn" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="auth-form__switch">
        ¿No tienes cuenta?{' '}
        <button
          type="button"
          className="auth-form__switch-btn"
          onClick={onSwitchToRegister}
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};