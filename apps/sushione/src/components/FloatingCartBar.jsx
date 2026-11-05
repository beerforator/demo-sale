import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './FloatingCartBar.css'

function countWord(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'товар'
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'товара'
  return 'товаров'
}

export default function FloatingCartBar() {
  const { totals } = useCart()
  const visible = totals.count > 0

  return (
    <div className={`float-bar${visible ? ' float-bar--show' : ''}`}>
      <div className="float-bar__info">
        <span>{totals.count} {countWord(totals.count)}</span>
        <b className="tabular">{totals.subtotal.toLocaleString('ru-RU')} ₽</b>
      </div>
      <Link to="/cart" className="float-bar__cta">В корзину →</Link>
    </div>
  )
}
