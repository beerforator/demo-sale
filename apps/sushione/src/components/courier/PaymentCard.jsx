export default function PaymentCard({ payment }) {
  const isCash = payment.method === 'cash'
  return (
    <div className="co-card co-card--pay reveal">
      <div>
        <div className="co-card__label">Оплата</div>
        <div className="co-sub co-sub--flush">{isCash ? 'Наличными курьеру' : 'Оплачено онлайн'}</div>
      </div>
      {isCash && <div className="co-amt tabular">сдача с {payment.changeFrom.toLocaleString('ru-RU')} ₽</div>}
    </div>
  )
}
