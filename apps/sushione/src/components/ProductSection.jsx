import ProductCard from './ProductCard'
import './ProductSection.css'

export default function ProductSection({ id, title, count, products }) {
  return (
    <section id={id} className="product-section">
      <div className="section-head">
        <h2>{title}</h2>
        <span>{count} {countWord(count)}</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function countWord(n) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'позиция'
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'позиции'
  return 'позиций'
}
