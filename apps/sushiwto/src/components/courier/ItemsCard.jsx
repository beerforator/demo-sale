export default function ItemsCard({ items }) {
  return (
    <div className="co-card reveal">
      <div className="co-card__label">Что везти</div>
      {items.map((item) => (
        <div className="co-item-row" key={item.name}>
          <span>{item.name}</span>
          <span className="n tabular">×{item.qty}</span>
        </div>
      ))}
    </div>
  )
}
