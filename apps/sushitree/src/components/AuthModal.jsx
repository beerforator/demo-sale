import { useState } from 'react'
import { X, User, Phone } from './Icons'

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('phone')
  const [phone, setPhone] = useState('')

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-overlay)',
        }}
      />

      <div style={{
        position: 'relative',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--spacing-xl)',
        width: '100%',
        maxWidth: '420px',
        boxShadow: 'var(--shadow-xl)',
        animation: 'scaleIn 0.3s ease',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-lg)',
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 800,
          }}>
            Вход
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--color-surface-hover)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-secondary)',
              transition: 'background 0.2s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          background: 'var(--color-border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          marginBottom: 'var(--spacing-lg)',
        }}>
          {[
            { id: 'phone', label: 'Телефон' },
            { id: 'email', label: 'Почта' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: mode === tab.id ? 'var(--color-surface)' : 'transparent',
                color: mode === tab.id ? 'var(--color-text)' : 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: mode === tab.id ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'phone' ? (
          <div>
            <label style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'block',
            }}>
              Номер телефона
            </label>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-md)',
            }}>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input"
                style={{ flex: 1 }}
              />
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Получить код
            </button>
          </div>
        ) : (
          <div>
            <label style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'block',
            }}>
              Электронная почта
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input"
              style={{ marginBottom: 'var(--spacing-md)' }}
            />
            <label style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-sm)',
              display: 'block',
            }}>
              Пароль
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input"
              style={{ marginBottom: 'var(--spacing-md)' }}
            />
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Войти
            </button>
          </div>
        )}

        <p style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginTop: 'var(--spacing-md)',
        }}>
          Нажимая кнопку, вы принимаете условия
          <br />пользовательского соглашения
        </p>
      </div>
    </div>
  )
}