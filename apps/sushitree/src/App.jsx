import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartPanel from './components/CartPanel.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CourierPage from './pages/CourierPage.jsx'
import AccountPage from './pages/AccountPage.jsx'

function AppLayout() {
  const { pathname, hash, key } = useLocation()
  const scrollKey = hash ? key : pathname

  useEffect(() => {
    if (hash) {
      const section = document.getElementById(hash.slice(1))
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, scrollKey])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
      <CartPanel />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isCourier = location.pathname.startsWith('/courier')

  if (isCourier) {
    return (
      <Routes>
        <Route path="/courier" element={<CourierPage />} />
      </Routes>
    )
  }

  return <AppLayout />
}
