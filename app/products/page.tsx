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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-xl text-gray-600">Discover amazing products from trusted sellers</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field min-w-[180px]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter by:</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="input-field min-w-[180px]"
            >
              <option value="all">All Products</option>
              <option value="sale">On Sale</option>
              <option value="new">New Arrivals</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
