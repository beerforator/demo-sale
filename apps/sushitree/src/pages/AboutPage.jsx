import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import chefPhoto from '../assets/food/chef.webp'
import storyPhoto from '../assets/food/set-family.webp'
import products from '../data/products.js'
import { Icon, MapPin, Phone, Clock, Mail, ChefHat, Fish, Truck } from '../components/Icons'

const uspCards = [
  {
    icon: ChefHat,
    title: 'Профессиональные повара',
    desc: 'Готовим с душой по проверенным рецептам',
  },
  {
    icon: Fish,
    title: 'Свежие продукты',
    desc: 'Рыба и морепродукты высшего качества',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    desc: 'Свои курьеры, доставка за 45–60 минут',
  },
  {
    icon: MapPin,
    title: 'Одно заведение',
    desc: 'Контроль качества на каждом этапе',
  },
]

const timeline = [
  { year: '2018', label: 'Открытие' },
  { year: '2019', label: 'Первые 1000 заказов' },
  { year: '2020', label: 'Своя доставка' },
  { year: '2022', label: 'Обновлённое меню' },
  { year: '2025', label: 'Любимый бренд города' },
]

const galleryIds = ['philadelphia', 'california', 'set-party', 'set-family', 'set-company', 'set-duo']
const gallery = galleryIds.map(id => products.find(product => product.id === id))

export default function AboutPage() {
  const revealRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    if (revealRef.current) {
      revealRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <main className="main-content main-content--full editorial-about">
      <div className="page-container" ref={revealRef}>

        <section className="editorial-about-cover" aria-labelledby="about-title">
          <div>
            <h1 id="about-title">СушиСтоРолл</h1>
            <p>Доставляем суши в Новороссийске с 2018 года.</p>
            <Link to="/#catalog" className="editorial-cta">Открыть меню <span aria-hidden="true">→</span></Link>
          </div>
          <img src={chefPhoto} alt="Суши на керамической тарелке" />
        </section>

        {/* ═══ SECTION 2: USP BLOCKS ═══ */}
        <section
          className="reveal"
          style={{ marginBottom: 'var(--spacing-3xl)' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--spacing-lg)',
            }}
            className="usp-grid"
          >
            {uspCards.map((card, i) => {
              const IconComp = card.icon
              return (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-base)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--spacing-md)',
                    }}
                  >
                    <IconComp size={36} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              )
            })}
          </div>
          <style>{`
            @media (max-width: 900px) {
              .usp-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 520px) {
              .usp-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* ═══ SECTION 3: STORY ═══ */}
        <section
          className="reveal"
          style={{ marginBottom: 'var(--spacing-3xl)' }}
        >
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            Наша история
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-2xl)',
              alignItems: 'center',
            }}
            className="story-grid"
          >
            <div>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: 'var(--spacing-xl)',
                }}
              >
                С 2018 года мы кормим Новороссийск. Начали с маленькой кухни и трёх курьеров.
                Сегодня — любимый сервис доставки суши с десятками блюд и командой профессионалов.
                Каждый ролл готовится под заказ, только из свежих продуктов.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface)',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'all var(--transition-fast)',
                      borderLeft: '4px solid var(--color-accent)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-accent)',
                        minWidth: 48,
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: 'var(--color-text)',
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                aspectRatio: '5 / 6',
                background: 'var(--color-border)',
              }}
            >
              <img
                src={storyPhoto}
                alt="Сет роллов на общем столе"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .story-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* ═══ SECTION 4: GALLERY ═══ */}
        <section
          className="reveal"
          style={{ marginBottom: 'var(--spacing-3xl)' }}
        >
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            Фотогалерея
          </h2>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: 'var(--spacing-sm)',
              scrollSnapType: 'x mandatory',
            }}
          >
            {gallery.map(product => (
              <div
                key={product.id}
                style={{
                  flex: '0 0 280px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  style={{
                    width: 280,
                    height: 200,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION 5: CONTACTS ═══ */}
        <section
          className="reveal"
          style={{ marginBottom: 'var(--spacing-3xl)' }}
        >
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            Контакты
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--spacing-2xl)',
              alignItems: 'stretch',
            }}
            className="contacts-grid"
          >
            <div
              style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-xl)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Адрес
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                    ул. Советов, 42, Новороссийск
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Телефон
                  </p>
                  <a
                    href="tel:+786171234567"
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    +7 (8617) 123-45-67
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Часы работы
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                    10:00 – 23:00, без выходных
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 2 }}>
                    Почта
                  </p>
                  <a
                    href="mailto:hello@sushistoroll.ru"
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    hello@sushistoroll.ru
                  </a>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 'var(--spacing-md)',
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                }}
              >
                {['Telegram', 'WhatsApp', 'VK'].map((name) => (
                  <span
                    key={name}
                    style={{
                      padding: '6px 16px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-accent-light)',
                      color: 'var(--color-accent)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-accent)'
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--color-accent-light)'
                      e.currentTarget.style.color = 'var(--color-accent)'
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                minHeight: 350,
                background: 'var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--font-size-lg)',
                  padding: 'var(--spacing-xl)',
                }}
              >
                <MapPin size={48} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <p style={{ fontWeight: 600 }}>[Карта — ул. Советов, 42]</p>
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .contacts-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

      </div>
    </main>
  )
}