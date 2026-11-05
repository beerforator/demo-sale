import { Link, useLocation } from 'react-router-dom'
import { MapPin, Phone, Clock } from './Icons'

const footerCss = `
/* Подвал — единственный тёмный блок на всём белом сайте: он «закрывает»
   страницу глубоким индиго и даёт оранжевому максимальный контраст.
   Переопределяем семантические переменные прямо на .footer — всё, что
   внутри, перекрашивается само, без правки каждого правила. */
.footer {
  background: var(--ai);
  --color-text: #FFFFFF;
  --color-text-secondary: rgba(255, 255, 255, 0.72);
  --color-text-muted: rgba(255, 255, 255, 0.48);
  --color-border: rgba(255, 255, 255, 0.16);
  --color-surface: rgba(255, 255, 255, 0.08);
  --color-accent: #FF7A45;
  color: #fff;
  border-top: none;
  padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.footer-brand-name {
  font-family: var(--font-display) !important;
  font-weight: 400 !important;
  font-size: 30px !important;
  letter-spacing: 0.01em !important;
}

.footer-heading {
  font-size: 10px !important;
  font-weight: 500 !important;
  letter-spacing: var(--track-wider) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.footer-brand-name {
  font-size: var(--font-size-xl);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.01em;
  margin-bottom: var(--spacing-sm);
}

.footer-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.footer-copyright {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: var(--spacing-md);
}

.footer-heading {
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--spacing-md);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-accent);
}

.footer-contact-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.5;
}

.footer-contact-row svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-text-muted);
}

.footer-social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.footer-social-link:hover {
  background: var(--color-accent);
  color: #fff;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-md);
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
`

export default function Footer() {
  const location = useLocation()
  const isRoot = location.pathname === '/'

  return (
    <>
      <style>{footerCss}</style>
      <footer className="footer" 
    //   style={isRoot ? { marginLeft: 'var(--sidebar-width)' } : undefined}
      >
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">СушиСтоРолл</div>
            <p className="footer-tagline">Доставка суши в Новороссийске с 2018</p>
            <p className="footer-copyright">© 2026 СушиСтоРолл</p>
          </div>

          <div>
            <h4 className="footer-heading">Меню</h4>
            <nav className="footer-links">
              <Link to="/" className="footer-link">Главная</Link>
              <Link to="/about" className="footer-link">О нас</Link>
              <Link to="/cart" className="footer-link">Корзина</Link>
              <Link to="/courier" className="footer-link">Курьеру</Link>
              <a href="#" className="footer-link">Доставка и оплата</a>
            </nav>
          </div>

          <div>
            <h4 className="footer-heading">Контакты</h4>
            <div className="footer-contact-row">
              <MapPin />
              <span>ул. Советов, 42, Новороссийск</span>
            </div>
            <div className="footer-contact-row">
              <Phone />
              <span>+7 (8617) 123-45-67</span>
            </div>
            <div className="footer-contact-row">
              <Clock />
              <span>10:00 – 23:00</span>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Мы в соцсетях</h4>
            <div className="footer-social-links">
              <a
                href="https://t.me/sushistoroll"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                TG
              </a>
              <a
                href="https://wa.me/786171234567"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <a
                href="https://vk.com/sushistoroll"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VK"
              >
                VK
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}