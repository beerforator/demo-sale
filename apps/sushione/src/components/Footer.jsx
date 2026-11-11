import { FooterDemoNotice } from '../../../../packages/customer/index.jsx'
import { Link } from 'react-router-dom'
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

.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, .8fr) minmax(0, 1.25fr) minmax(0, .85fr);
  gap: clamp(20px, 3.5vw, 56px);
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.footer-brand-name {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 400;
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
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--track-wider);
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

.footer-contacts { font-style: normal; }

.footer-contact-row a:hover { color: var(--color-accent); }

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

@media (min-width: 1025px) {
  .footer { z-index: 111; }
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
  return (
    <>
      <style>{footerCss}</style>
      <footer className="footer">
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
              <Link to="/checkout" className="footer-link">Оформление заказа</Link>
            </nav>
          </div>

          <div>
            <h4 className="footer-heading">Контакты</h4>
            <address className="footer-contacts">
              <div className="footer-contact-row">
                <MapPin aria-hidden="true" />
                <span>ул. Советов, 42, Новороссийск</span>
              </div>
              <div className="footer-contact-row">
                <Phone aria-hidden="true" />
                <a href="tel:+786171234567">+7 (8617) 123-45-67</a>
              </div>
              <div className="footer-contact-row">
                <Clock aria-hidden="true" />
                <span><time dateTime="10:00">10:00</time> – <time dateTime="23:00">23:00</time></span>
              </div>
            </address>
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
        <FooterDemoNotice />
      </footer>
    </>
  )
}