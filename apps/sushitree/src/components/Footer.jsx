import { FooterDemoNotice } from '../../../../packages/customer/index.jsx'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from './Icons'

const footerCss = `
.footer {
  background: #eee4d8;
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-3xl) var(--spacing-xl) var(--spacing-xl);
  
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  max-width: 1344px;
  margin: 0 auto;
}

.footer-brand-name {
  font: 700 30px/1 var(--editorial-serif);
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
              <Link to="/#catalog" className="footer-link">Меню</Link>
              <Link to="/about" className="footer-link">О нас</Link>
              <Link to="/cart" className="footer-link">Корзина</Link>
              <Link to="/courier" className="footer-link">Курьеру</Link>
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
