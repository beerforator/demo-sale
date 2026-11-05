import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartPanel from './components/CartPanel.jsx'
import Tentacles from './components/Tentacles.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CourierPage from './pages/CourierPage.jsx'

function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <>
      <Tentacles />
      <Header onMenuToggle={() => setMobileSidebarOpen(prev => !prev)} />
      <Routes>
        <Route path="/" element={<HomePage mobileSidebarOpen={mobileSidebarOpen} onMobileSidebarClose={() => setMobileSidebarOpen(false)} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <CartPanel />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isCourier = location.pathname.startsWith('/courier')

  return (
    <>
      <ScrollToTop />
      {isCourier ? (
        <Routes>
          <Route path="/courier" element={<CourierPage />} />
        </Routes>
      ) : (
        <AppLayout />
      )}
    </>
  )
}