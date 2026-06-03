import React, { useState } from 'react';
import { LoginForm } from '../../features/auth/components/login/LoginForm';
import { RegisterForm } from '../../features/auth/components/register/RegisterForm';
import './AuthPage.scss';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__tabs">
          <button
            className={`auth-page__tab ${mode === 'login' ? 'auth-page__tab--active' : ''}`}
            onClick={() => setMode('login')}
          >
            Iniciar sesión
          </button>

          <button
            className={`auth-page__tab ${mode === 'register' ? 'auth-page__tab--active' : ''}`}
            onClick={() => setMode('register')}
          >
            Crear cuenta
          </button>
        </div>

        <div className="auth-page__form">
          {mode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
};