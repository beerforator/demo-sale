import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartPanel from './components/CartPanel.jsx'
import OctopusTentacles from './components/OctopusTentacles.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CourierPage from './pages/CourierPage.jsx'

function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <>
      <Header onMenuToggle={() => setMobileSidebarOpen(prev => !prev)} />
      <Routes>
        <Route path="/" element={<HomePage mobileSidebarOpen={mobileSidebarOpen} onMobileSidebarClose={() => setMobileSidebarOpen(false)} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
      <CartPanel />
      <OctopusTentacles />
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