import { useCart } from '../context/CartContext'
import './CartItemRow.css'

export default function CartItemRow({ item }) {
  const { changeQty } = useCart()

  return (
    <div className="cart-item reveal in">
      <div className="cart-item__emoji">{item.emoji}</div>
      <div className="cart-item__info">
        <div className="cart-item__name">{item.name}</div>
        <div className="cart-item__unit tabular">{item.price.toLocaleString('ru-RU')} ₽ / шт</div>
      </div>
      <div className="stepper">
        <button onClick={() => changeQty(item.id, -1)} aria-label="Уменьшить количество">−</button>
        <span className="stepper__n tabular">{item.qty}</span>
        <button onClick={() => changeQty(item.id, 1)} aria-label="Увеличить количество">+</button>
      </div>
      <div className="cart-item__price tabular">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
    </div>
  )
}
