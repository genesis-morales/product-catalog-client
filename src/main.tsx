import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';
import './index.css'
import App from './App.tsx'
import { CartProvider } from './features/cart/context/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{
      token: { fontFamily: "'General Sans', -apple-system, Helvetica, sans-serif" }}}>
      <CartProvider>
        <App />
      </CartProvider>
    </ConfigProvider>
  </StrictMode>,
)