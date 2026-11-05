export default function ContactCard({ customer }) {
  return (
    <div className="co-card reveal">
      <div className="co-card__label">Клиент</div>
      <div className="co-contact">
        <div className="co-avatar">{customer.initials}</div>
        <div>
          <div className="co-who">{customer.name}</div>
          <div className="co-phone tabular">{customer.phoneMasked}</div>
        </div>
        <a className="call-btn" href={`tel:${customer.phoneMasked.replace(/[^\d+]/g, '')}`} aria-label="Позвонить клиенту">📞</a>
      </div>
    </div>
  )
}
