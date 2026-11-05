import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import store from '../data/store.json'

// ══════════════════════════════════════════════
// Геро-баннер: белая бумага, крупная антиква и один снимок.
// Заголовок выезжает построчно из-под маски, круг-энсо
// «дорисовывается» за снимком.
// ══════════════════════════════════════════════

// 円相 (энсо) — круг, написанный кистью. Ровным stroke его не получить:
// у мазка меняется толщина, поэтому фигура строится как заливка между
// внешней и внутренней дугой с плавным утолщением к середине.
function buildEnso({ radius, maxWidth, from, to, steps }) {
  const outer = []
  const inner = []

  for (let i = 0; i <= steps; i++) {
    const u = i / steps
    const angle = from + (to - from) * u

    // Толщина: тонко на входе и выходе кисти, плотно в середине
    const thickness = maxWidth * (0.16 + 0.84 * Math.sin(Math.PI * Math.pow(u, 0.82)))
    // Лёгкая неровность руки
    const wobble = radius * (1 + 0.014 * Math.sin(u * 7.1) + 0.009 * Math.cos(u * 4.3 + 1.2))

    const ro = wobble + thickness / 2
    const ri = wobble - thickness / 2

    outer.push([Math.cos(angle) * ro, Math.sin(angle) * ro])
    inner.push([Math.cos(angle) * ri, Math.sin(angle) * ri])
  }

  const fmt = (p) => `${Math.round(p[0] * 10) / 10} ${Math.round(p[1] * 10) / 10}`
  return `M${outer.map(fmt).join('L')}L${[...inner].reverse().map(fmt).join('L')}Z`
}

function Enso() {
  const d = useMemo(
    () => buildEnso({
      radius: 150,
      maxWidth: 15,
      from: -Math.PI * 0.42,
      to: Math.PI * 1.5,
      steps: 220,
    }),
    []
  )

  return (
    <svg className="hero__enso" viewBox="-180 -180 360 360" aria-hidden="true">
      <path d={d} fill="currentColor" transform="rotate(-14)" />
    </svg>
  )
}

const TITLE_LINES = [
  { text: 'Японская', accent: false },
  { text: 'кухня', accent: true },
  { text: 'без спешки', accent: false },
]

export default function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">
            {store.city} · доставка суши и роллов
          </span>
        </div>

        <h1 className="hero__title">
          {TITLE_LINES.map((line, i) => (
            <span className="hero__line" key={line.text}>
              <span style={{ '--d': `${0.18 + i * 0.11}s` }}>
                {line.accent ? <em>{line.text}</em> : line.text}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero__lede">
          Каждый ролл собирают вручную за несколько минут до того, как курьер
          выйдет за дверь. Рыба — с утренней поставки, рис — на красном уксусе.
        </p>

        <div className="hero__actions">
          <button className="btn btn-primary btn-lg" onClick={onExplore}>
            Смотреть меню
          </button>
          <Link to="/about" className="hero__link">
            О нас
          </Link>
        </div>

        <div className="hero__meta">
          <div className="hero__meta-item">
            <strong>{store.deliveryTime}</strong>
            <span>Доставка</span>
          </div>
          <div className="hero__meta-item">
            <strong>{store.freeDeliveryFrom} ₽</strong>
            <span>Бесплатно от</span>
          </div>
          <div className="hero__meta-item">
            <strong>{store.hours}</strong>
            <span>Ежедневно</span>
          </div>
        </div>
      </div>

      <div className="hero__visual">
        {/* Все украшения позиционируются относительно самого снимка,
            а не колонки — иначе на широких экранах они разъезжаются */}
        <div className="hero__stage">
          <Enso />

          <figure className="hero__frame">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&h=1200&fit=crop"
              alt="Свежесобранные роллы"
            />
          </figure>

          <span className="hero__vertical jp">寿司と刺身</span>
          <span className="hero__stamp">鮨</span>
        </div>
      </div>
    </section>
  )
}
