import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

const BANNERS = [
  {
    id: 1,
    title: 'Сеты со скидкой 20%',
    subtitle: 'На все сеты при заказе от 1500 ₽',
    bg: 'linear-gradient(135deg, #E8380D 0%, #F45D2C 50%, #FF7A45 100%)',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=300&fit=crop',
    cta: 'Выбрать сет'
  },
  {
    id: 2,
    title: 'Новинка: WOK',
    subtitle: 'Лапша удон и рис с курицей и креветками',
    bg: 'linear-gradient(135deg, #1A9C5E 0%, #20B870 50%, #34D388 100%)',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=300&fit=crop',
    cta: 'Попробовать'
  },
  {
    id: 3,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 900 ₽ по Новороссийску',
    bg: 'linear-gradient(135deg, #F4B731 0%, #F7C54E 50%, #FAD56B 100%)',
    image: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=600&h=300&fit=crop',
    cta: 'В меню'
  },
  {
    id: 4,
    title: 'Мы открылись!',
    subtitle: 'СушиСтоРолл — теперь и в твоём районе. Свежие роллы каждый день',
    bg: 'linear-gradient(135deg, #2D1B15 0%, #4A2C23 50%, #6B3D30 100%)',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=300&fit=crop',
    cta: 'Смотреть меню'
  },
  {
    id: 5,
    title: 'Готовим с душой',
    subtitle: 'Открытая кухня, свежие продукты, профессиональные повара',
    bg: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=300&fit=crop',
    cta: 'О нас'
  }
]

const SLIDE_INTERVAL = 5000

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const prev = useCallback(() => {
    goTo(current === 0 ? BANNERS.length - 1 : current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo(current === BANNERS.length - 1 ? 0 : current + 1)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next])

  const banner = BANNERS[current]

  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 'var(--spacing-xl)',
      height: '280px',
      background: banner.bg,
    }}>
      <div style={{
        display: 'flex',
        height: '100%',
        transition: 'opacity 0.4s ease',
        opacity: isTransitioning ? 0.7 : 1,
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 48px 48px 60px',
          color: '#fff',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            {banner.title}
          </h2>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            opacity: 0.9,
            marginBottom: '24px',
            lineHeight: 1.5,
          }}>
            {banner.subtitle}
          </p>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 28px',
            borderRadius: 'var(--radius-md)',
            background: '#fff',
            color: 'var(--color-text)',
            fontWeight: 700,
            fontSize: 'var(--font-size-base)',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            alignSelf: 'flex-start',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {banner.cta}
          </button>
        </div>
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src={banner.image}
            alt={banner.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.01), transparent)',
          }}/>
        </div>
      </div>

      <button onClick={prev} style={arrowStyle('left')} aria-label="Previous">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} style={arrowStyle('right')} aria-label="Next">
        <ChevronRight size={20} />
      </button>

      <div style={dotsContainerStyle}>
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={dotStyle(i === current)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side]: '12px',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(4px)',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s ease',
  zIndex: 2,
  onmouseenter: 'this.style.background="rgba(255,255,255,0.35)"',
  onmouseleave: 'this.style.background="rgba(255,255,255,0.2)"',
})

const dotsContainerStyle = {
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
  zIndex: 2,
}

const dotStyle = (active) => ({
  width: active ? '24px' : '8px',
  height: '8px',
  borderRadius: '4px',
  background: active ? '#fff' : 'rgba(255,255,255,0.4)',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  transition: 'all 0.3s ease',
})
