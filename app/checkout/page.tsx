'use client'

import { useState } from 'react'
import OptimizedImage from '../../components/OptimizedImage'

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
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    quantity: 1,
    seller: 'AudioTech Pro'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    quantity: 2,
    seller: 'FitTech Solutions'
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

  const steps = [
    { number: 1, title: 'Shipping', icon: '🚚' },
    { number: 2, title: 'Payment', icon: '💳' },
    { number: 3, title: 'Review', icon: '✅' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Secure Checkout
          </h1>
          <p className="text-gray-600">Complete your order in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-3 ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? '✓' : step.icon}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm opacity-75">Step {step.number}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {currentStep === 1 && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                      🚚
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apartment, suite, etc.
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Apt 4B (Optional)"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select State</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="CA">California</option>
                          <option value="FL">Florida</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700 font-medium">Save this address for future orders</span>
                      </label>
                    </div>

                    <button 
                      onClick={() => handleStepChange(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                      💳
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-blue-800">Secure Payment</h3>
                        <p className="text-blue-600 text-sm">Your payment information is encrypted and secure</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="sameAsBilling"
                          checked={formData.sameAsBilling}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700 font-medium">Billing address same as shipping address</span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => handleStepChange(1)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                      >
                        Back to Shipping
                      </button>
                      <button 
                        onClick={() => handleStepChange(3)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                      ✅
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Address Review */}
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Shipping Address</h3>
                        <button 
                          onClick={() => handleStepChange(1)} 
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-gray-700">
                        <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        {formData.apartment && <p>{formData.apartment}</p>}
                        <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p>{formData.email}</p>
                      </div>
                    </div>

                    {/* Payment Review */}
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Payment Method</h3>
                        <button 
                          onClick={() => handleStepChange(2)} 
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-gray-700">
                        <p className="flex items-center gap-2">
                          💳 •••• •••• •••• {formData.cardNumber.slice(-4)}
                        </p>
                        <p className="font-medium">{formData.cardName}</p>
                      </div>
                    </div>

                    {/* Gift Option */}
                    <div className="border-t border-gray-200 pt-6">
                      <label className="flex items-center gap-3 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          name="isGift"
                          checked={formData.isGift}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-gray-700 font-medium">This is a gift</span>
                      </label>
                      
                      {formData.isGift && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gift Message
                          </label>
                          <textarea
                            name="giftMessage"
                            value={formData.giftMessage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            rows={3}
                            placeholder="Enter your gift message..."
                          />
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg"
                    >
                      🎉 Place Order - ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative">
                      <OptimizedImage 
                        src={item.image} 
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-gray-500 text-xs">by {item.seller}</p>
                    </div>
                    <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure SSL Encryption
                </div>
                <div className="text-gray-500 text-xs">
                  Your payment information is protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
