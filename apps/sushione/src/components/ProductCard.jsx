import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Plus, Check } from './Icons'

const TAG_LABELS = {
  new: 'Новинка',
  hit: 'Хит',
  spicy: 'Острое',
  veg: 'Вегетарианское',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const stopList = product.stopList
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (stopList) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className={`card${stopList ? ' stop-list-item' : ''}`}>
      <div className="card__media">
        {stopList && <span className="stop-list-badge">Нет в наличии</span>}

        <img src={product.image} alt={product.name} loading="lazy" />

        {product.tags && product.tags.length > 0 && (
          <div className="card__tags">
            {product.tags.map((tag) => (
              <span key={tag} className={`tag tag--${tag}`}>
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>
        )}

        <button
          className={`card__add${added ? ' card__add--added' : ''}`}
          onClick={handleAdd}
          disabled={stopList}
          aria-label={stopList ? 'Нет в наличии' : `Добавить «${product.name}» в корзину`}
        >
          {added ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>

      <h3 className="card__name">{product.name}</h3>
      <p className="card__desc">{product.description}</p>

      <div className="card__foot">
        <span className="card__price">{product.price} ₽</span>
        <span className="card__unit">
          {product.weight}
          {product.pieces > 1 && ` · ${product.pieces} шт`}
        </span>
      </div>
    </article>
  )
}
