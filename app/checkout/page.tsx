'use client'

import { useState } from 'react'
import Image from 'next/image'

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  seller: string
}

const orderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199,
    image: '/api/placeholder/80/80',
    quantity: 1,
    seller: 'AudioTech'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299,
    image: '/api/placeholder/80/80',
    quantity: 2,
    seller: 'FitGear'
  }
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Options
    saveAddress: false,
    sameAsBilling: true,
    giftMessage: '',
    isGift: false
  })

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleSubmit = async () => {
    // Process order
    console.log('Order submitted:', formData)
    window.location.href = '/order-confirmation'
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-progress">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {currentStep === 1 && (
              <div className="form-section">
                <h2>Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Apartment, suite, etc.</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Optional"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={handleInputChange}
                    />
                    Save this address for future orders
                  </label>
                </div>

                <button 
                  onClick={() => handleStepChange(2)}
                  className="continue-button"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-section">
                <h2>Payment Information</h2>
                
                <div className="payment-methods">
                  <div className="payment-method active">
                    <input type="radio" name="paymentMethod" value="card" defaultChecked />
                    <span>💳 Credit/Debit Card</span>
                  </div>
                  <div className="payment-method">
                    <input type="radio" name="paymentMethod" value="paypal" />
                    <span>🏦 PayPal</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                    />
                    Billing address same as shipping address
                  </label>
                </div>

                <div className="form-buttons">
                  <button 
                    onClick={() => handleStepChange(1)}
                    className="back-button"
                  >
                    Back to Shipping
                  </button>
                  <button 
                    onClick={() => handleStepChange(3)}
                    className="continue-button"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-section">
                <h2>Order Review</h2>
                
                <div className="review-section">
                  <h3>Shipping Address</h3>
                  <div className="address-summary">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    {formData.apartment && <p>{formData.apartment}</p>}
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.email}</p>
                  </div>
                  <button onClick={() => handleStepChange(1)} className="edit-button">
                    Edit
                  </button>
                </div>

                <div className="review-section">
                  <h3>Payment Method</h3>
                  <div className="payment-summary">
                    <p>💳 •••• •••• •••• {formData.cardNumber.slice(-4)}</p>
                    <p>{formData.cardName}</p>
                  </div>
                  <button onClick={() => handleStepChange(2)} className="edit-button">
                    Edit
                  </button>
                </div>

                <div className="gift-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isGift"
                      checked={formData.isGift}
                      onChange={handleInputChange}
                    />
                    This is a gift
                  </label>
                  
                  {formData.isGift && (
                    <div className="form-group">
                      <label>Gift Message</label>
                      <textarea
                        name="giftMessage"
                        value={formData.giftMessage}
                        onChange={handleInputChange}
                        placeholder="Enter your gift message..."
                        rows={3}
                      />
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSubmit}
                  className="place-order-button"
                >
                  Place Order - ${total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="order-items">
              {orderItems.map(item => (
                <div key={item.id} className="order-item">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>by {item.seller}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-line total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="security-badges">
              <div className="security-badge">🔒 Secure Checkout</div>
              <div className="security-badge">🛡️ Protected by SSL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
