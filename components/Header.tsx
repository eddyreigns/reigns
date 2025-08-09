'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <h1>Reigns</h1>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/categories" className="nav-link">Categories</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
          
          <Link href="/cart" className="cart-button">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          
          <Link href="/login" className="login-button">Login</Link>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
