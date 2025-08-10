'use client'

import Link from 'next/link'
import { useAuth } from '../lib/auth'

export default function Footer() {
  const { isAuthenticated } = useAuth()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Reigns Marketplace</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your beautiful market for everything you need.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 group">
                <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 group">
                <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 group">
                <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 group">
                <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">💼</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
            <div className="space-y-3">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors duration-200">All Products</Link>
              <Link href="/categories" className="block text-gray-300 hover:text-white transition-colors duration-200">Categories</Link>
              <Link href="/deals" className="block text-gray-300 hover:text-white transition-colors duration-200">Special Deals</Link>
              <Link href="/new-arrivals" className="block text-gray-300 hover:text-white transition-colors duration-200">New Arrivals</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <div className="space-y-3">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors duration-200">Help Center</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors duration-200">Contact Us</Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors duration-200">Shipping Info</Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors duration-200">Returns</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Account</h4>
            <div className="space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link href="/login" className="block text-gray-300 hover:text-white transition-colors duration-200">Sign In</Link>
                  <Link href="/register" className="block text-gray-300 hover:text-white transition-colors duration-200">Register</Link>
                </>
              ) : (
                <>
                  <Link href="/profile" className="block text-gray-300 hover:text-white transition-colors duration-200">My Account</Link>
                  <Link href="/orders" className="block text-gray-300 hover:text-white transition-colors duration-200">Order History</Link>
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Sell</h4>
            <div className="space-y-3">
              <Link href="/sell" className="block text-gray-300 hover:text-white transition-colors duration-200">Start Selling</Link>
              <Link href="/seller-dashboard" className="block text-gray-300 hover:text-white transition-colors duration-200">Seller Dashboard</Link>
              <Link href="/seller-help" className="block text-gray-300 hover:text-white transition-colors duration-200">Seller Help</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 Reigns Marketplace. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
