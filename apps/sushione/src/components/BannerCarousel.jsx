import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

// Промо-полоса вместо прежней цветной карусели: белая бумага,
// волосяная рамка, акцент — только в одном слове заголовка.
const BANNERS = [
  {
    id: 1,
    title: ['Сеты со скидкой', '20%'],
    subtitle: 'На все сеты при заказе от 1500 ₽',
    accent: 'var(--kaki)',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=900&h=700&fit=crop',
    cta: 'Выбрать сет',
  },
  {
    id: 2,
    title: ['Новое меню', 'WOK'],
    subtitle: 'Лапша удон и рис с курицей и креветками',
    accent: 'var(--ai)',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=900&h=700&fit=crop',
    cta: 'Попробовать',
  },
  {
    id: 3,
    title: ['Доставка', 'бесплатно'],
    subtitle: 'При заказе от 900 ₽ по Новороссийску',
    accent: 'var(--ai-2)',
    image: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=900&h=700&fit=crop',
    cta: 'В меню',
  },
  {
    id: 4,
    title: ['Открытая', 'кухня'],
    subtitle: 'Свежие продукты и повара, которые работали в Токио',
    accent: 'var(--kaki-2)',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=900&h=700&fit=crop',
    cta: 'О нас',
  },
]

const SLIDE_INTERVAL = 6500

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c === BANNERS.length - 1 ? 0 : c + 1))
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? BANNERS.length - 1 : c - 1))
  }, [])

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next, current])

  const banner = BANNERS[current]

  return (
    <div className="promo" style={{ '--accent-color': banner.accent }}>
      <div className="promo__copy">
        <span className="promo__index">
          {String(current + 1).padStart(2, '0')} / {String(BANNERS.length).padStart(2, '0')}
        </span>

        <h2 className="promo__title promo__slide-enter" key={`t-${banner.id}`}>
          {banner.title[0]}
          <br />
          <em>{banner.title[1]}</em>
        </h2>

        <p className="promo__sub promo__slide-enter" key={`s-${banner.id}`}>
          {banner.subtitle}
        </p>

        <button className="promo__cta">
          {banner.cta}
          <ChevronRight size={13} />
        </button>

        <div className="promo__nav">
          <button className="promo__arrow" onClick={prev} aria-label="Предыдущий слайд">
            <ChevronLeft size={15} />
          </button>
          <button className="promo__arrow" onClick={next} aria-label="Следующий слайд">
            <ChevronRight size={15} />
          </button>
          <div className="promo__dots">
            {BANNERS.map((b, i) => (
              <button
                key={b.id}
                className={`promo__dot${i === current ? ' promo__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="promo__media">
        <img key={banner.id} src={banner.image} alt="" className="promo__slide-enter" />
      </div>
    </div>
  )
}
