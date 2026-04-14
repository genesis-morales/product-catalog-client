import React, { useState } from 'react';
import { Alert } from 'antd';
import { useAuth } from '../../context/AuthContext';
import type { RegisterData } from '../../types/auth';
import '../AuthForms.scss';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterData>({
    name: '', email: '', password: '', password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(form);
      onSuccess?.();
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

      <form onSubmit={handleSubmit} className="auth-form__body">
        <div className="auth-form__field">
          <label className="auth-form__label">Nombre completo</label>
          <input
            type="text"
            className="auth-form__input"
            placeholder="Tu nombre"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label">Correo electrónico</label>
          <input
            type="email"
            className="auth-form__input"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label">Contraseña</label>
          <input
            type="password"
            className="auth-form__input"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
        </div>

        <div className="auth-form__field">
          <label className="auth-form__label">Confirmar contraseña</label>
          <input
            type="password"
            className="auth-form__input"
            placeholder="Repite tu contraseña"
            value={form.password_confirmation}
            onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="auth-form__btn" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </form>

      <p className="auth-form__switch">
        ¿Ya tienes cuenta?{' '}
        <button className="auth-form__switch-btn" onClick={onSwitchToLogin}>
          Inicia sesión
        </button>
      </p>
    </div>
  );
};