'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  seller: string
  quantity: number
  inStock: boolean
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199,
    originalPrice: 249,
    image: '/api/placeholder/150/150',
    seller: 'AudioTech',
    quantity: 1,
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299,
    image: '/api/placeholder/150/150',
    seller: 'FitGear',
    quantity: 2,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29,
    originalPrice: 39,
    image: '/api/placeholder/150/150',
    seller: 'EcoWear',
    quantity: 1,
    inStock: false
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.1)
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setDiscount(0.2)
    } else {
      alert('Invalid promo code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  const availableItems = cartItems.filter(item => item.inStock)
  const unavailableItems = cartItems.filter(item => !item.inStock)

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart ({cartItems.length} items)</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started</p>
            <Link href="/products" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {availableItems.length > 0 && (
                <div className="cart-section">
                  <h3>Available Items ({availableItems.length})</h3>
                  {availableItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={150}
                          height={150}
                        />
                      </div>
                      
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-seller">Sold by {item.seller}</p>
                        <div className="item-pricing">
                          <span className="current-price">${item.price}</span>
                          {item.originalPrice && (
                            <span className="original-price">${item.originalPrice}</span>
                          )}
                        </div>
                        <span className="stock-status available">✅ In Stock</span>
                      </div>
                      
                      <div className="item-quantity">
                        <label>Qty:</label>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-button"
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="item-total">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="remove-button"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {unavailableItems.length > 0 && (
                <div className="cart-section">
                  <h3>Unavailable Items ({unavailableItems.length})</h3>
                  {unavailableItems.map(item => (
                    <div key={item.id} className="cart-item unavailable">
                      <div className="item-image">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={150}
                          height={150}
                        />
                      </div>
                      
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-seller">Sold by {item.seller}</p>
                        <div className="item-pricing">
                          <span className="current-price">${item.price}</span>
                          {item.originalPrice && (
                            <span className="original-price">${item.originalPrice}</span>
                          )}
                        </div>
                        <span className="stock-status unavailable">❌ Out of Stock</span>
                      </div>
                      
                      <div className="item-actions">
                        <button className="save-for-later-button">Save for Later</button>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="promo-section">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button onClick={applyPromoCode} className="apply-promo-button">
                    Apply
                  </button>
                </div>

                <div className="summary-line">
                  <span>Subtotal ({availableItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount ({(discount * 100)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                
                <div className="summary-line">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="summary-line total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link 
                  href="/checkout" 
                  className={`checkout-button ${availableItems.length === 0 ? 'disabled' : ''}`}
                >
                  Proceed to Checkout
                </Link>

                <div className="shipping-info">
                  <p>🚚 {shipping === 0 ? 'Free shipping applied!' : 'Add $' + (100 - subtotal).toFixed(2) + ' more for free shipping'}</p>
                  <p>↩️ Free returns within 30 days</p>
                </div>
              </div>

              <div className="recommended-products">
                <h4>You might also like</h4>
                <div className="recommended-item">
                  <Image src="/api/placeholder/80/80" alt="Product" width={80} height={80} />
                  <div>
                    <p>Wireless Mouse</p>
                    <span>$39.99</span>
                  </div>
                  <button className="add-recommended-button">+</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
