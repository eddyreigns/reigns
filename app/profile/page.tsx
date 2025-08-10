'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth, withAuth } from '../../lib/auth'
import Image from 'next/image'

function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    zipCode: '10001',
    country: 'United States'
  })

  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }))
    }
  }, [user])

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 199.99,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 89.99,
      status: 'Shipped',
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: 299.99,
      status: 'Processing',
      items: 3
    }
  ]

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profileData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            {user?.profilePicture || user?.shopLogo ? (
              <Image
                src={user.profilePicture || user.shopLogo || ''}
                alt={`${user.firstName} ${user.lastName}`}
                width={80}
                height={80}
                className={`object-cover ${user.profilePicture ? 'rounded-full' : 'rounded-lg'}`}
              />
            ) : (
              <div className="avatar-circle">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            )}
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>Member since {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}</p>
            {user?.accountType && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                {user.accountType === 'both' ? 'Buyer & Seller' : user.accountType}
              </span>
            )}
          </div>

          <nav className="profile-nav">
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile Information
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              📦 Order History
            </button>
            <button 
              className={activeTab === 'wishlist' ? 'active' : ''}
              onClick={() => setActiveTab('wishlist')}
            >
              ❤️ Wishlist
            </button>
            <button 
              className={activeTab === 'addresses' ? 'active' : ''}
              onClick={() => setActiveTab('addresses')}
            >
              📍 Addresses
            </button>
            <button 
              className={activeTab === 'security' ? 'active' : ''}
              onClick={() => setActiveTab('security')}
            >
              🔒 Security
            </button>
            <Link href="/seller-dashboard" className="profile-nav-link">
              🏪 Seller Dashboard
            </Link>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Information</h2>
              <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={profileData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-section">
              <h2>Order History</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">#{order.id}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      <p>Items: {order.items}</p>
                      <p>Total: ${order.total}</p>
                    </div>
                    <Link href={`/orders/${order.id}`} className="view-order-button">
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="profile-section">
              <h2>Your Wishlist</h2>
              <p>Your wishlist is empty. Start adding products you love!</p>
              <Link href="/products" className="browse-button">
                Browse Products
              </Link>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="profile-section">
              <h2>Saved Addresses</h2>
              <div className="address-card">
                <h4>Primary Address</h4>
                <p>{profileData.address}</p>
                <p>{profileData.city}, {profileData.zipCode}</p>
                <p>{profileData.country}</p>
                <button className="edit-address-button">Edit</button>
              </div>
              <button className="add-address-button">+ Add New Address</button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-section">
              <h2>Security Settings</h2>
              <div className="security-item">
                <h4>Password</h4>
                <p>Last changed 30 days ago</p>
                <button className="change-password-button">Change Password</button>
              </div>
              <div className="security-item">
                <h4>Two-Factor Authentication</h4>
                <p>Not enabled</p>
                <button className="enable-2fa-button">Enable 2FA</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withAuth(ProfilePage)
