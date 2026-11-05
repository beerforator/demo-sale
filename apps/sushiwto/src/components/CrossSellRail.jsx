import { useCart } from '../context/CartContext'
import './CrossSellRail.css'

export default function CrossSellRail({ products }) {
  const { addItem } = useCart()
  if (!products.length) return null

  return (
    <section>
      <div className="section-head"><h2>Добавить к заказу?</h2><span></span></div>
      <div className="cross-rail">
        {products.map((product) => (
          <div className="cross-card" key={product.id}>
            <div className="cross-card__emoji">{product.emoji}</div>
            <div className="cross-card__name">{product.name}</div>
            <div className="cross-card__price tabular">{product.price.toLocaleString('ru-RU')} ₽</div>
            <button onClick={() => addItem(product)}>Добавить</button>
          </div>
        ))}
      </div>
    </section>
  )
}
