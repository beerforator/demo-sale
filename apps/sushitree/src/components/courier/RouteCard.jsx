export default function RouteCard({ order }) {
  return (
    <div className="co-card reveal">
      <div className="co-card__label">Куда ехать</div>
      <div className="co-addr">{order.address}</div>
      <div className="co-sub">
        {order.addressNote} · {order.distanceKm} км · ≈ {order.etaMinutes} мин
      </div>
      <button className="route-btn">🧭 Построить маршрут</button>
    </div>
  )
}
