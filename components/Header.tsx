'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                Reigns
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full md:top-0 left-0 right-0 md:right-auto bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-0 border-t md:border-t-0 border-white/20 md:border-none shadow-xl md:shadow-none rounded-b-2xl md:rounded-none mx-4 md:mx-0`}>
            {['Products', 'Categories', 'About', 'Contact'].map((item, index) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className="relative group text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
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
              <button className="text-gray-400 hover:text-indigo-600 transition-colors duration-300 hover:scale-110 transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Cart */}
            <Link href="/cart" className="relative group p-2.5 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-110 transform">
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
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {/* Login Button */}
            <Link href="/login" className="hidden md:inline-flex relative group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden group p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-110 transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 p-4 mx-4 rounded-b-2xl shadow-xl">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
            />
            <button className="text-gray-400 hover:text-indigo-600 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <Link href="/login" className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl mt-4 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            Login
          </Link>
        </div>
      )}
    </header>
  )
}
