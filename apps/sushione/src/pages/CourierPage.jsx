import { useState } from 'react';
import { MapPin, Phone, User, Package, CreditCard, ExternalLink, Navigation, CheckCircle, Check } from '../components/Icons';

const ORDER = {
  id: '1473',
  address: 'ул. Советов, д. 42, кв. 15, подъезд 2, этаж 3',
  comment: 'Домофон не работает, позвонить',
  customer: { name: 'Иван Петров', phone: '+7 (988) 123-45-67' },
  items: [
    { name: 'Филадельфия классик', qty: 1, price: 420 },
    { name: 'Калифорния с лососем', qty: 2, price: 390 },
    { name: 'Запечённый с угрём', qty: 1, price: 420 },
  ],
  extras: ['Соус спайси — в подарок', 'Палочки (2 шт.)', 'Салфетки (2 шт.)'],
  total: 1390,
};

const STATUS_MAP = {
  cooking: 'ГОТОВИТСЯ',
  en_route: 'В ПУТИ',
  delivered: 'ДОСТАВЛЕН',
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#F9F6F0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: '0 4px',
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: 'var(--color-text)',
    letterSpacing: '-0.02em',
  },
  exitLink: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  section: {
    background: 'var(--color-surface)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--color-text-muted)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  rowBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  commentText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'var(--color-text-muted)',
    marginBottom: 12,
  },
  outlineBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    border: '2px solid var(--color-border)',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  outlineBtnGreen: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    border: '2px solid var(--color-green)',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-green)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  outlineBtnBlue: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    border: '2px solid #2E8FD8',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    color: '#2E8FD8',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  clientPhone: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  clientBtns: {
    display: 'flex',
    gap: 8,
    marginTop: 12,
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid var(--color-border-light)',
  },
  itemName: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--color-text)',
    whiteSpace: 'nowrap',
  },
  extraRow: {
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    padding: '4px 0',
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--color-text)',
  },
  paymentCheck: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    color: 'var(--color-green)',
    fontWeight: 600,
    fontSize: 14,
    marginLeft: 4,
  },
  paymentSum: {
    fontSize: 17,
    fontWeight: 700,
    color: 'var(--color-text)',
    marginTop: 8,
  },
  paymentTip: {
    fontSize: 14,
    color: 'var(--color-text-muted)',
    marginTop: 4,
  },
  actions: {
    background: 'var(--color-accent-light)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--color-accent)',
    marginBottom: 16,
  },
  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'var(--color-accent)',
  },
  greenBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '14px 24px',
    background: 'var(--color-green)',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    marginBottom: 10,
  },
  greenBtnDisabled: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '14px 24px',
    background: 'var(--color-border)',
    color: 'var(--color-text-muted)',
    border: 'none',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: 'default',
    pointerEvents: 'none',
    marginBottom: 10,
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 0',
    gap: 12,
  },
  successText: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--color-green)',
  },
  bottomLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    padding: '12px 0',
    textDecoration: 'none',
  },
};

export default function CourierPage() {
  const [status, setStatus] = useState('cooking');

  const goToEnRoute = () => setStatus('en_route');
  const goToDelivered = () => setStatus('delivered');

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.topBar}>
          <span style={styles.title}>Заказ #{ORDER.id}</span>
          <span style={styles.exitLink}>
            Выйти
          </span>
        </div>

        <div style={styles.section}>
          <div style={{ ...styles.sectionTitle, marginBottom: 8 }}>КУДА ЕХАТЬ</div>
          <div style={styles.iconLabel}>
            <MapPin size={20} color="var(--color-accent)" />
            <span style={styles.addressText}>{ORDER.address}</span>
          </div>
          <div style={styles.commentText}>Комментарий: {ORDER.comment}</div>
          <button style={styles.outlineBtn}>
            <ExternalLink size={16} />
            Открыть в навигаторе
          </button>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>КЛИЕНТ</div>
          <div style={styles.iconLabel}>
            <User size={20} color="var(--color-text-secondary)" />
            <span style={styles.clientName}>{ORDER.customer.name}</span>
          </div>
          <div style={styles.iconLabel}>
            <Phone size={20} color="var(--color-text-secondary)" />
            <span style={styles.clientPhone}>{ORDER.customer.phone}</span>
          </div>
          <div style={styles.clientBtns}>
            <button style={styles.outlineBtnGreen}>
              <Phone size={16} />
              Позвонить
            </button>
            <button style={styles.outlineBtnBlue}>
              <ExternalLink size={16} />
              Telegram
            </button>
          </div>
        </div>

        <div style={styles.section}>
          <div style={{ ...styles.row, gap: 8, marginBottom: 12 }}>
            <Package size={20} color="var(--color-text-secondary)" />
            <span style={styles.sectionTitle}>ЧТО ВЕЗТИ</span>
          </div>
          {ORDER.items.map((item, i) => (
            <div key={i} style={styles.itemRow}>
              <span style={styles.itemName}>
                {item.qty}&times; {item.name}
              </span>
              <span style={styles.itemPrice}>{item.price} ₽</span>
            </div>
          ))}
          {ORDER.extras.map((extra, i) => (
            <div key={i} style={styles.extraRow}>{extra}</div>
          ))}
        </div>

        <div style={styles.section}>
          <div style={{ ...styles.row, gap: 8, marginBottom: 8 }}>
            <CreditCard size={20} color="var(--color-text-secondary)" />
            <span style={styles.paymentLabel}>
              Картой онлайн
              <span style={styles.paymentCheck}>
                <Check size={16} />
                Оплачено
              </span>
            </span>
          </div>
          <div style={styles.paymentSum}>Сумма: {ORDER.total.toLocaleString('ru-RU')} ₽</div>
          <div style={styles.paymentTip}>Чаевые: не указаны</div>
        </div>

        <div style={styles.actions}>
          <div style={styles.sectionTitle}>ДЕЙСТВИЯ</div>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Текущий статус: {STATUS_MAP[status]}
          </div>

          {status === 'delivered' ? (
            <div style={styles.success}>
              <CheckCircle size={48} color="var(--color-green)" />
              <span style={styles.successText}>Заказ доставлен</span>
            </div>
          ) : (
            <>
              <button
                style={status === 'cooking' ? styles.greenBtn : styles.greenBtnDisabled}
                onClick={status === 'cooking' ? goToEnRoute : undefined}
                disabled={status !== 'cooking'}
              >
                <Navigation size={18} color={status === 'cooking' ? '#fff' : 'var(--color-text-muted)'} />
                <span style={{ marginLeft: 8 }}>В ПУТИ</span>
              </button>
              <button
                style={status === 'en_route' ? styles.greenBtn : { ...styles.greenBtnDisabled, marginBottom: 0 }}
                onClick={status === 'en_route' ? goToDelivered : undefined}
                disabled={status !== 'en_route'}
              >
                <CheckCircle size={18} color={status === 'en_route' ? '#fff' : 'var(--color-text-muted)'} />
                <span style={{ marginLeft: 8 }}>ДОСТАВЛЕН</span>
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={styles.bottomLink}>
            <ExternalLink size={16} />
            Чат с менеджером
          </span>
        </div>

      </div>
    </div>
  );
}