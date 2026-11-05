import './OrderSummary.css'

export default function OrderSummary({ totals }) {
  return (
    <div className="summary">
      <div className="summary-row">
        <span>Сумма товаров</span>
        <span className="v tabular">{totals.subtotal.toLocaleString('ru-RU')} ₽</span>
      </div>
      {totals.discount > 0 && (
        <div className="summary-row summary-row--disc">
          <span>Скидка по промокоду</span>
          <span className="v tabular">−{totals.discount.toLocaleString('ru-RU')} ₽</span>
        </div>
      )}
      <div className="summary-row">
        <span>Доставка</span>
        <span className="v tabular">{totals.delivery === 0 ? 'бесплатно' : `${totals.delivery} ₽`}</span>
      </div>
      <div className="summary-row summary-row--total">
        <span>Итого</span>
        <span className="v tabular">{totals.total.toLocaleString('ru-RU')} ₽</span>
      </div>
    </div>
  )
}
