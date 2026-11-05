import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

const BANNERS = [
  {
    id: 1,
    title: 'СушиСтоРолл',
    subtitle: 'Доставка суши в Новороссийске с 2018',
    cta: 'Смотреть меню',
    accent: '#E8380D',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    title: 'Сеты со скидкой 20%',
    subtitle: 'При заказе от 1500 ₽',
    cta: 'Выбрать сет',
    accent: '#1A365D',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&h=800&fit=crop',
  },
  {
    id: 3,
    title: 'Новинка: WOK',
    subtitle: 'Лапша удон и рис с курицей и креветками',
    cta: 'Попробовать',
    accent: '#E8380D',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1200&h=800&fit=crop',
  },
  {
    id: 4,
    title: 'Бесплатная доставка',
    subtitle: 'При заказе от 900 ₽ по Новороссийску',
    cta: 'В меню',
    accent: '#1A365D',
    image: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=1200&h=800&fit=crop',
  },
]

const SLIDE_INTERVAL = 6000

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
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

  const scrollToMenu = () => {
    const firstSection = document.querySelector('[id^="section-"]')
    if (firstSection) {
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64
      window.scrollTo({ top: firstSection.getBoundingClientRect().top + window.scrollY - headerH - 20, behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
        .hero-full {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }
        .hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.8s ease;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.15) 40%,
            rgba(0, 0, 0, 0.35) 100%
          );
        }
        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          z-index: 2;
        }
        .hero-title {
          font-family: 'Sangha', var(--font-primary);
          font-size: clamp(40px, 8vw, 80px);
          font-weight: 400;
          letter-spacing: 0.02em;
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
          transition: opacity 0.6s ease;
        }
        .hero-subtitle {
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 400;
          color: rgba(255,255,255,0.85);
          margin-bottom: 40px;
          line-height: 1.5;
          max-width: 520px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.2);
          transition: opacity 0.6s ease;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          padding: 16px 40px;
          border-radius: 100px;
          font-size: var(--font-size-base);
          font-weight: 600;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.35s ease;
          letter-spacing: 0.03em;
          backdrop-filter: blur(4px);
        }
        .hero-cta:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.8);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }
        .hero-scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.6);
          font-size: var(--font-size-xs);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: heroFloat 3s ease-in-out infinite;
        }
        .hero-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.6), transparent);
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(800%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 3;
          backdrop-filter: blur(4px);
          display: none;
        }
        .hero-arrow:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.4);
          color: #fff;
        }
        .hero-arrow-left { left: 24px; }
        .hero-arrow-right { right: 24px; }
        .hero-dots {
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 2;
        }
        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s ease;
          background: rgba(255,255,255,0.3);
        }
        .hero-dot.active {
          background: #fff;
          box-shadow: 0 0 12px rgba(255,255,255,0.4);
        }
        .hero-dot:not(.active):hover {
          background: rgba(255,255,255,0.6);
        }
        @media (max-width: 768px) {
          .hero-arrow {
            width: 40px;
            height: 40px;
          }
          .hero-arrow-left { left: 10px; }
          .hero-arrow-right { right: 10px; }
          .hero-dots { bottom: 90px; }
        }
      `}</style>

      <div className="hero-full">
        {BANNERS.map((b, i) => (
          <img
            key={b.id}
            className="hero-bg-image"
            src={b.image}
            alt={b.title}
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}
        <div className="hero-overlay" />

        <div className="hero-content" style={{ opacity: isTransitioning ? 0.4 : 1 }}>
          <h1 className="hero-title">{banner.title}</h1>
          <p className="hero-subtitle">{banner.subtitle}</p>
          <button className="hero-cta" onClick={scrollToMenu}>
            {banner.cta}
          </button>
        </div>

        <button onClick={prev} className="hero-arrow hero-arrow-left" aria-label="Previous">
          <ChevronLeft size={22} />
        </button>
        <button onClick={next} className="hero-arrow hero-arrow-right" aria-label="Next">
          <ChevronRight size={22} />
        </button>

        <div className="hero-dots">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`hero-dot${i === current ? ' active' : ''}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>меню</span>
        </div>
      </div>
    </>
  )
}