const moscowClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Moscow',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hourCycle: 'h23',
})

function moscowParts(now) {
  return Object.fromEntries(moscowClock.formatToParts(now).map(({ type, value }) => [type, value]))
}

export function moscowDay(now = new Date()) {
  const { year, month, day } = moscowParts(now)
  return `${year}-${month}-${day}`
}

export function millisecondsUntilMoscowMidnight(now = new Date()) {
  const { hour, minute, second } = moscowParts(now)
  const elapsed = ((Number(hour) * 60 + Number(minute)) * 60 + Number(second)) * 1000
  return 86_400_000 - elapsed - now.getUTCMilliseconds()
}

export function readDailyCart(storage, key, day) {
  try {
    const saved = JSON.parse(storage.getItem(key))
    if (saved?.day === day && Array.isArray(saved.items) && saved.items.every(item =>
      typeof item?.productId === 'string' && Number.isInteger(item.quantity) &&
      item.quantity >= 1 && item.quantity <= 99
    )) {
      return { items: saved.items, promoCode: typeof saved.promoCode === 'string' ? saved.promoCode : null }
    }
  } catch {}
  return { items: [], promoCode: null }
}
