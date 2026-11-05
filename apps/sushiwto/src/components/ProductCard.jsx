import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Plus, Check } from './Icons'

export default function ProductCard({ product }) {
  const { addItem, openPanel } = useCart()
  const stopList = product.stopList
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (stopList) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const tagLabels = {
    new: 'Новинка',
    hit: 'Хит',
    spicy: 'Острое',
    veg: 'Вегетарианское'
  }

  return (
    <div
      className={stopList ? 'stop-list-item' : ''}
      style={{
        position: 'relative',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border-light)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: stopList ? 'default' : 'pointer',
        animation: 'fadeInUp 0.5s ease forwards',
        opacity: 0,
        animationDelay: 'var(--delay, 0ms)',
      }}
      onMouseEnter={e => {
        if (stopList) return
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--color-border-light)'
      }}
    >
      {stopList && (
        <span className="stop-list-badge">Нет в наличии</span>
      )}

      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        overflow: 'hidden',
        background: 'var(--color-surface-hover)',
      }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        />

        {product.tags && product.tags.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'flex-end',
          }}>
            {product.tags.map(tag => (
              <span key={tag} className={`tag tag--${tag}`}>
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{
          fontSize: 'var(--font-size-base)',
          fontWeight: 700,
          marginBottom: '4px',
          lineHeight: 1.3,
          color: 'var(--color-text)',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: '14px',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.description}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <span style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 800,
              color: 'var(--color-text)',
            }}>
              {product.price} ₽
            </span>
            <div style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              marginTop: '2px',
            }}>
              {product.weight}{product.pieces > 1 ? ` / ${product.pieces} шт.` : ''}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={stopList}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: added ? 'var(--color-green)' : 'var(--color-blue-soft)',
              color: '#fff',
              cursor: stopList ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: added ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseEnter={e => {
              if (!stopList && !added) e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={e => {
              if (!added) e.currentTarget.style.transform = 'scale(1)'
            }}
            aria-label={stopList ? 'Нет в наличии' : 'Добавить в корзину'}
          >
            {added ? <Check size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}