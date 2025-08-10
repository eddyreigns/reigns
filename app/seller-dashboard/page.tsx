'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const stats = {
    totalRevenue: 12459.50,
    totalOrders: 156,
    activeProducts: 23,
    averageRating: 4.6,
    monthlyGrowth: 15.3
  }

  const recentOrders = [
    { id: 'ORD-789', customer: 'Sarah Johnson', product: 'Wireless Headphones', amount: 199.99, status: 'Shipped', date: '2024-01-15' },
    { id: 'ORD-788', customer: 'Mike Chen', product: 'Smart Watch', amount: 299.99, status: 'Processing', date: '2024-01-14' },
    { id: 'ORD-787', customer: 'Emily Davis', product: 'Bluetooth Speaker', amount: 89.99, status: 'Delivered', date: '2024-01-13' },
  ]

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 45, revenue: 8995.50 },
    { name: 'Smart Fitness Watch', sales: 32, revenue: 9567.68 },
    { name: 'Bluetooth Speaker Pro', sales: 28, revenue: 2519.72 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage your store and track performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/seller-dashboard/add-product" 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            <Link 
              href="/seller-dashboard/analytics" 
              className="flex items-center gap-2 px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="flex flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'products', label: 'Products', icon: '📦' },
              { id: 'orders', label: 'Orders', icon: '🛒' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={`flex-1 min-w-fit px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="flex items-center gap-2 justify-center">
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      +{stats.monthlyGrowth}%
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">${stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-gray-600 font-medium">Total Revenue</p>
                </div>
                
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      +12 this week
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalOrders}</h3>
                  <p className="text-gray-600 font-medium">Total Orders</p>
                </div>
                
                <div className="group bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                      2 pending
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.activeProducts}</h3>
                  <p className="text-gray-600 font-medium">Active Products</p>
                </div>
                
                <div className="group bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      +0.2 this month
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating}</h3>
                  <p className="text-gray-600 font-medium">Average Rating</p>
                </div>
              </div>

              {/* Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                      <Link href="/seller-dashboard/orders" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group">
                        View All 
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentOrders.map(order => (
                      <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">#{order.id}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-gray-600 font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.product}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">${order.amount}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">Top Products</h3>
                      <Link href="/seller-dashboard/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group">
                        Manage 
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {topProducts.map((product, index) => (
                      <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">{product.sales} sales</span>
                              <span className="text-sm font-medium text-green-600">${product.revenue.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 lg:mb-0">Product Management</h2>
                  <Link 
                    href="/seller-dashboard/add-product" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    + Add New Product
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Products</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Out of Stock</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-xl font-semibold text-gray-700 mb-4">
                      <span>Product</span>
                      <span>SKU</span>
                      <span>Stock</span>
                      <span>Price</span>
                      <span>Status</span>
                      <span>Actions</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-6 gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl"></div>
                          <span className="font-medium text-gray-900">Premium Wireless Headphones</span>
                        </div>
                        <span className="flex items-center text-gray-600">WH-001</span>
                        <span className="flex items-center text-gray-600">45</span>
                        <span className="flex items-center font-semibold text-gray-900">$199.99</span>
                        <span className="flex items-center">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl"></div>
                          <span className="font-medium text-gray-900">Smart Fitness Watch</span>
                        </div>
                        <span className="flex items-center text-gray-600">SW-002</span>
                        <span className="flex items-center text-gray-600">12</span>
                        <span className="flex items-center font-semibold text-gray-900">$299.99</span>
                        <span className="flex items-center">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <select className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Orders</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                  <input 
                    type="date" 
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-xl font-semibold text-gray-700 mb-4">
                      <span>Order ID</span>
                      <span>Customer</span>
                      <span>Product</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span>Date</span>
                      <span>Actions</span>
                    </div>
                    
                    <div className="space-y-3">
                      {recentOrders.map(order => (
                        <div key={order.id} className="grid grid-cols-7 gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200">
                          <span className="flex items-center font-semibold text-gray-900">#{order.id}</span>
                          <span className="flex items-center text-gray-600">{order.customer}</span>
                          <span className="flex items-center text-gray-600">{order.product}</span>
                          <span className="flex items-center font-semibold text-gray-900">${order.amount}</span>
                          <span className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {order.status}
                            </span>
                          </span>
                          <span className="flex items-center text-gray-600">{order.date}</span>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                              View
                            </button>
                            <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 text-sm font-medium">
                              Update
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Analytics</h2>
                
                <div className="flex gap-2 mb-8">
                  {['7D', '30D', '90D', '1Y'].map((period, index) => (
                    <button 
                      key={period}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        index === 0 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Over Time</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📈</div>
                        <p className="text-gray-600 font-medium">Chart visualization would go here</p>
                        <p className="text-sm text-gray-500 mt-2">Interactive revenue charts and trends</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 border border-purple-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Top Categories</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🥧</div>
                        <p className="text-gray-600 font-medium">Pie chart visualization would go here</p>
                        <p className="text-sm text-gray-500 mt-2">Category performance breakdown</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Store Settings</h2>
                
                <div className="space-y-8">
                  <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Store Information</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                        <input 
                          type="text" 
                          defaultValue="AudioTech Store" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                        <textarea 
                          rows={4} 
                          defaultValue="Premium audio equipment and accessories"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Settings</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                        <input 
                          type="text" 
                          placeholder="Account Number" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                        <input 
                          type="text" 
                          placeholder="Tax Identification Number" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
