import { FooterDemoNotice } from '../../../../packages/customer/index.jsx'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from './Icons'

const footerCss = `
.footer {
  background: #fff;
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl);
  position: relative;
  z-index: 1;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, var(--color-blue-soft), var(--color-accent), var(--color-blue-soft), transparent);
  opacity: 0.12;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.footer-brand-name {
  font-family: 'Sangha', var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: 400;
  color: var(--color-accent);
  letter-spacing: 0.02em;
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
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  color: var(--color-blue-soft);
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
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.footer-social-link:hover {
  background: var(--color-blue-soft);
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
              <span><time dateTime="10:00">10:00</time> – <time dateTime="23:00">23:00</time></span>
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
        <FooterDemoNotice />
      </footer>
    </>
  )
}