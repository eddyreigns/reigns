'use client'

import { useState } from 'react'
import ProductCard from '../../components/ProductCard'

const sampleProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199,
    originalPrice: 249,
    image: '/api/placeholder/300/300',
    rating: 4.5,
    reviews: 128,
    seller: 'AudioTech',
    isOnSale: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299,
    image: '/api/placeholder/300/300',
    rating: 4.8,
    reviews: 256,
    seller: 'FitGear'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29,
    originalPrice: 39,
    image: '/api/placeholder/300/300',
    rating: 4.3,
    reviews: 89,
    seller: 'EcoWear',
    isOnSale: true
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 599,
    image: '/api/placeholder/300/300',
    rating: 4.9,
    reviews: 45,
    seller: 'PhotoPro'
  },
  {
    id: '5',
    name: 'Artisan Coffee Beans',
    price: 24,
    image: '/api/placeholder/300/300',
    rating: 4.7,
    reviews: 167,
    seller: 'BrewMaster'
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    price: 79,
    originalPrice: 99,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 203,
    seller: 'GameGear',
    isOnSale: true
  }
]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('featured')
  const [filterBy, setFilterBy] = useState('all')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from trusted sellers worldwide
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-3 flex-1">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex items-center gap-3 flex-1">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</label>
              <select 
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="all">All Products</option>
                <option value="sale">On Sale</option>
                <option value="new">New Arrivals</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sampleProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="transform transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
            <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button 
                key={page}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === 1 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
              Next
            </button>
          </nav>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of sellers and start your own store today
            </p>
            <Link 
              href="/seller-dashboard" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Start Selling
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
