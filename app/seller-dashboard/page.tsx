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
    <div className="seller-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Seller Dashboard</h1>
          <div className="header-actions">
            <Link href="/seller-dashboard/add-product" className="add-product-button">
              + Add Product
            </Link>
            <Link href="/seller-dashboard/analytics" className="analytics-button">
              📊 Analytics
            </Link>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            📦 Products
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Orders
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <h3>${stats.totalRevenue.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                    <span className="stat-change positive">+{stats.monthlyGrowth}% this month</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                    <span className="stat-change positive">+12 this week</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">🛍️</div>
                  <div className="stat-info">
                    <h3>{stats.activeProducts}</h3>
                    <p>Active Products</p>
                    <span className="stat-change neutral">2 pending review</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <h3>{stats.averageRating}</h3>
                    <p>Average Rating</p>
                    <span className="stat-change positive">+0.2 this month</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-widgets">
                <div className="widget">
                  <h3>Recent Orders</h3>
                  <div className="orders-list">
                    {recentOrders.map(order => (
                      <div key={order.id} className="order-item">
                        <div className="order-info">
                          <span className="order-id">#{order.id}</span>
                          <span className="customer-name">{order.customer}</span>
                          <span className="product-name">{order.product}</span>
                        </div>
                        <div className="order-details">
                          <span className="order-amount">${order.amount}</span>
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/seller-dashboard/orders" className="view-all-link">
                    View All Orders →
                  </Link>
                </div>

                <div className="widget">
                  <h3>Top Products</h3>
                  <div className="products-list">
                    {topProducts.map((product, index) => (
                      <div key={index} className="product-item">
                        <div className="product-rank">#{index + 1}</div>
                        <div className="product-info">
                          <span className="product-name">{product.name}</span>
                          <span className="product-stats">
                            {product.sales} sales • ${product.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/seller-dashboard/products" className="view-all-link">
                    Manage Products →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-tab">
              <div className="products-header">
                <h2>Product Management</h2>
                <Link href="/seller-dashboard/add-product" className="add-product-button">
                  + Add New Product
                </Link>
              </div>

              <div className="products-filters">
                <select className="filter-select">
                  <option>All Products</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Out of Stock</option>
                </select>
                <input type="text" placeholder="Search products..." className="search-input" />
              </div>

              <div className="products-table">
                <div className="table-header">
                  <span>Product</span>
                  <span>SKU</span>
                  <span>Stock</span>
                  <span>Price</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                
                <div className="table-row">
                  <div className="product-cell">
                    <div className="product-image-small"></div>
                    <span>Premium Wireless Headphones</span>
                  </div>
                  <span>WH-001</span>
                  <span>45</span>
                  <span>$199.99</span>
                  <span className="status active">Active</span>
                  <div className="actions">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="product-cell">
                    <div className="product-image-small"></div>
                    <span>Smart Fitness Watch</span>
                  </div>
                  <span>SW-002</span>
                  <span>12</span>
                  <span>$299.99</span>
                  <span className="status active">Active</span>
                  <div className="actions">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-tab">
              <h2>Order Management</h2>
              
              <div className="orders-filters">
                <select className="filter-select">
                  <option>All Orders</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <input type="date" className="date-input" />
              </div>

              <div className="orders-table">
                <div className="table-header">
                  <span>Order ID</span>
                  <span>Customer</span>
                  <span>Product</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Date</span>
                  <span>Actions</span>
                </div>
                
                {recentOrders.map(order => (
                  <div key={order.id} className="table-row">
                    <span>#{order.id}</span>
                    <span>{order.customer}</span>
                    <span>{order.product}</span>
                    <span>${order.amount}</span>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    <span>{order.date}</span>
                    <div className="actions">
                      <button className="view-button">View</button>
                      <button className="update-button">Update</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-tab">
              <h2>Sales Analytics</h2>
              
              <div className="analytics-period">
                <button className="period-button active">7D</button>
                <button className="period-button">30D</button>
                <button className="period-button">90D</button>
                <button className="period-button">1Y</button>
              </div>

              <div className="analytics-charts">
                <div className="chart-placeholder">
                  <h3>Revenue Over Time</h3>
                  <div className="chart-area">
                    <p>📈 Chart visualization would go here</p>
                  </div>
                </div>
                
                <div className="chart-placeholder">
                  <h3>Top Categories</h3>
                  <div className="chart-area">
                    <p>🥧 Pie chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <h2>Store Settings</h2>
              
              <div className="settings-section">
                <h3>Store Information</h3>
                <div className="form-group">
                  <label>Store Name</label>
                  <input type="text" defaultValue="AudioTech Store" />
                </div>
                <div className="form-group">
                  <label>Store Description</label>
                  <textarea rows={3} defaultValue="Premium audio equipment and accessories"></textarea>
                </div>
              </div>

              <div className="settings-section">
                <h3>Payment Settings</h3>
                <div className="form-group">
                  <label>Bank Account</label>
                  <input type="text" placeholder="Account Number" />
                </div>
                <div className="form-group">
                  <label>Tax ID</label>
                  <input type="text" placeholder="Tax Identification Number" />
                </div>
              </div>

              <button className="save-settings-button">Save Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
