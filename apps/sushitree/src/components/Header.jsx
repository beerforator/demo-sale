import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCustomer } from '../../../../packages/customer/index.jsx'
import { useCart } from '../context/CartContext.jsx'
import { ShoppingCart, User } from './Icons.jsx'
import AuthModal from './AuthModal.jsx'

export default function Header() {
  const { itemCount, openPanel } = useCart()
  const { state: customer } = useCustomer()
  const [authOpen, setAuthOpen] = useState(false)
  const navigate = useNavigate()

  function openAccount() {
    if (customer.signedIn) navigate('/account')
    else setAuthOpen(true)
  }

  return (
    <>
      <header className="editorial-header">
        <div className="editorial-container editorial-header-inner">
          <Link to="/" className="editorial-wordmark" aria-label="СушиСтоРолл, на главную">СушиСтоРолл<span aria-hidden="true">.</span></Link>
          <nav className="editorial-nav" aria-label="Основная навигация">
            <Link to="/#catalog">Меню</Link>
            <Link to="/#sets">Сеты</Link>
            <Link to="/about">О нас</Link>
          </nav>
          <div className="editorial-header-actions">
            <button type="button" onClick={openAccount} aria-label="Личный кабинет">
              <User size={19} />
              <span className="editorial-account-label">{customer.signedIn ? 'Профиль' : 'Войти'}</span>
            </button>
            <button className="editorial-cart-trigger" type="button" onClick={openPanel} aria-label={`Корзина, товаров: ${itemCount}`}>
              <ShoppingCart size={18} />
              <span aria-hidden="true">{itemCount}</span>
            </button>
          </div>
        </div>
      </header>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
