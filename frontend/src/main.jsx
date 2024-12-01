import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/PrevOrder.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </AuthProvider>,
)
