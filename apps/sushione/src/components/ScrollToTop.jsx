import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ══════════════════════════════════════════════
// React Router сам скролл не сбрасывает: при переходе на «О нас» или
// «Корзину» страница открывалась там же, где её оставили на главной, —
// и вступительные анимации проматывались мимо зрителя.
//
// useLayoutEffect, а не useEffect: layout-эффекты родителя выполняются
// раньше обычных эффектов детей, поэтому мы успеваем встать наверх до
// того, как страница заведёт свои IntersectionObserver'ы — иначе они
// пометили бы «видимыми» блоки, которые зритель так и не увидел.
// ══════════════════════════════════════════════
export default function ScrollToTop() {
  const { pathname } = useLocation()

  // Браузер восстанавливает позицию скролла при перезагрузке и «назад».
  // Для страницы, которая целиком построена на появлении блоков, это тоже
  // означает пропущенное вступление, поэтому восстановление отключаем.
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    // behavior: 'instant' перебивает html { scroll-behavior: smooth } —
    // иначе переход превращался бы в долгую прокрутку через всё меню.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
