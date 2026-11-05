import { useCart } from '../context/CartContext'
import './HitsRail.css'

export default function HitsRail({ id, products }) {
  const { addItem } = useCart()

  return (
    <section id={id} className="hits-section">
      <div className="section-head">
        <h2>Хиты продаж</h2>
        <span>по заказам недели</span>
      </div>
      <div className="hit-rail">
        {products.map((product) => (
          <button
            key={product.id}
            className="hit-card reveal"
            onClick={() => addItem(product)}
            aria-label={`Добавить ${product.name}`}
          >
            <div className="hit-card__emoji">{product.emoji}</div>
            <div className="hit-card__name">{product.name}</div>
            <div className="hit-card__price tabular">{product.price.toLocaleString('ru-RU')} ₽</div>
          </button>
        ))}
      </div>
    </section>
  )
}
