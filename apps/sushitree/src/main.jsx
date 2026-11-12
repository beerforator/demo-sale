import { CustomerProvider } from '../../../packages/customer/index.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import './styles/index.css'
import './assets/fonts/cormorant.css'
import './styles/editorial.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <CustomerProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>
)
