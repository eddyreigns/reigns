'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { useAuth } from '../lib/auth'
import OptimizedImage from './OptimizedImage'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLogout = useCallback(() => {
    logout()
    setShowUserMenu(false)
  }, [logout])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Reigns
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full md:top-0 left-0 right-0 md:right-auto bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-0 border-t md:border-t-0 border-white/20 md:border-none shadow-xl md:shadow-none rounded-b-2xl md:rounded-none mx-4 md:mx-0`}>
            {[
              { name: 'Products', href: '/products' },
              { name: 'Categories', href: '/categories' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item, index) => (
              <Link 
                key={item.name}
                href={item.href}
                className="relative group text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100/80 backdrop-blur-sm rounded-2xl px-4 py-2.5 focus-within:bg-white focus-within:shadow-lg transition-all duration-300 group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm w-48 placeholder-gray-500 group-focus-within:w-56 transition-all duration-300"
              />
              <button className="text-gray-400 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Cart */}
            <Link href="/cart" className="relative group p-2.5 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 transform">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {/* User Profile / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 group p-2 rounded-xl hover:bg-white/50 transition-all duration-300"
                >
                  <div className="relative">
                    {user.accountType === 'seller' || user.accountType === 'both' ? (
                      <div className="flex items-center gap-2">
                        {user.shopLogo && (
                          <OptimizedImage
                            src={user.shopLogo}
                            alt={user.shopName || 'Shop logo'}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-300"
                            priority={true}
                          />
                        )}
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-semibold text-gray-800">{user.shopName}</p>
                          <p className="text-xs text-gray-500">Seller</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {user.profilePicture && (
                          <OptimizedImage
                            src={user.profilePicture}
                            alt={`${user.firstName} ${user.lastName}`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-300"
                            priority={true}
                          />
                        )}
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500">Customer</p>
                        </div>
                      </div>
                    )}
                    <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? '✓ Verified' : '⏳ Pending Verification'}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      {(user.accountType === 'seller' || user.accountType === 'both') && (
                        <Link href="/seller-dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Seller Dashboard
                        </Link>
                      )}

                      <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        My Orders
                      </Link>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:inline-flex relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden group p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 p-4 mx-4 rounded-b-2xl shadow-xl">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
            />
            <button className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          {isAuthenticated && user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                {user.accountType === 'seller' || user.accountType === 'both' ? (
                  user.shopLogo && (
                    <OptimizedImage
                      src={user.shopLogo}
                      alt={user.shopName || 'Shop logo'}
                      width={32}
                      height={32}
                      className="rounded-lg object-cover"
                      priority={true}
                    />
                  )
                ) : (
                  user.profilePicture && (
                    <OptimizedImage
                      src={user.profilePicture}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      priority={true}
                    />
                  )
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user.accountType === 'seller' || user.accountType === 'both' ? user.shopName : `${user.firstName} ${user.lastName}`}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
