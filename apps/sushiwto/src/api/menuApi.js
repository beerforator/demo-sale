import menu from '../data/menu.json'
import promos from '../data/promos.json'
import promocodes from '../data/promocodes.json'

// Данные сейчас читаются из локального JSON. Когда появится бэкенд,
// эти функции можно заменить на fetch(...) — сигнатуры уже async.

export async function getMenu() {
  return menu
}

export async function getPromos() {
  return promos
}

export async function checkPromoCode(code) {
  const entry = promocodes[code.trim().toUpperCase()]
  return entry ? { valid: true, ...entry } : { valid: false }
}
