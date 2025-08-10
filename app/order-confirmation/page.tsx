'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OptimizedImage from '../../components/OptimizedImage'

const orderDetails = {
  orderNumber: 'ORD-2024-001',
  orderDate: new Date().toISOString(),
  estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      seller: 'AudioTech Pro'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 249.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      seller: 'FitTech Solutions'
    }
  ],
  shippingAddress: {
    name: 'John Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  billing: {
    subtotal: 699.97,
    discount: 0,
    shipping: 0,
    tax: 55.99,
    total: 755.96
  }
}

export default function OrderConfirmationPage() {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Success Animation */}
      <div className="text-center py-16">
        <div className={`inline-block ${isAnimating ? 'animate-bounce' : ''}`}>
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
          Order Confirmed! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Thank you for your purchase! We've received your order and will start processing it right away.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={`/orders/${orderDetails.orderNumber}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Track Your Order
          </Link>
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Order Details */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Order Details</h2>
                <p className="text-blue-100">Order #{orderDetails.orderNumber}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-blue-100">Order Date</p>
                <p className="font-semibold">
                  {new Date(orderDetails.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Delivery Estimate */}
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-bold text-green-800">Estimated Delivery</h3>
              </div>
              <p className="text-green-700">
                {new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-green-600 text-sm mt-1">
                We'll send you tracking information once your order ships
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Items Ordered</h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Sold by {item.seller}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-gray-600 text-sm">${item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-1 text-gray-700">
                    <p className="font-semibold">{orderDetails.shippingAddress.name}</p>
                    <p>{orderDetails.shippingAddress.address}</p>
                    <p>
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                    </p>
                    <p>{orderDetails.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${orderDetails.billing.subtotal.toFixed(2)}</span>
                    </div>
                    {orderDetails.billing.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${orderDetails.billing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{orderDetails.billing.shipping === 0 ? 'FREE' : `$${orderDetails.billing.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${orderDetails.billing.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${orderDetails.billing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-gray-600 text-sm">
              We've sent a confirmation email with your order details and receipt.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-bold text-gray-900 mb-2">Get Updates</h3>
            <p className="text-gray-600 text-sm">
              Track your order status and delivery updates in your account.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="font-bold text-gray-900 mb-2">Share the Love</h3>
            <p className="text-gray-600 text-sm">
              Tell your friends about your great finds and earn rewards!
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Have questions about your order? Our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Support
            </Link>
            <Link 
              href="/orders"
              className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
