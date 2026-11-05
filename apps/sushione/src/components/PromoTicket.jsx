import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './PromoTicket.css'

export default function PromoTicket() {
  const { promo, applyPromoCode, clearPromo } = useCart()
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)

  async function handleApply() {
    if (!value.trim()) return
    const ok = await applyPromoCode(value)
    if (ok) {
      setValue('')
    } else {
      setShake(false)
      requestAnimationFrame(() => setShake(true))
    }
  }

  return (
    <>
      <div className={`ticket${shake ? ' ticket--shake' : ''}`} onAnimationEnd={() => setShake(false)}>
        <input
          placeholder="Промокод"
          maxLength={12}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <button onClick={handleApply}>Применить</button>
      </div>
      <div className={`promo-applied${promo ? ' promo-applied--show' : ''}`}>
        {promo && (
          <>
            ✓ Промокод {promo.code} применён · −{Math.round(promo.discount * 100)}%
            <button className="promo-applied__clear" onClick={clearPromo} aria-label="Убрать промокод">✕</button>
          </>
        )}
      </div>
    </>
  )
}
