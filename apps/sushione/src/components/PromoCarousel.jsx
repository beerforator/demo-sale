import './PromoCarousel.css'

export default function PromoCarousel({ promos }) {
  return (
    <div className="promo-rail">
      {promos.map((promo) => (
        <div key={promo.id} className={`promo-card promo-card--${promo.variant}`}>
          {promo.title}
          <small>{promo.subtitle}</small>
        </div>
      ))}
    </div>
  )
}
