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
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>All Products</h1>
          <p>Discover amazing products from trusted sellers</p>
        </div>

        <div className="products-filters">
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by:</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Products</option>
              <option value="sale">On Sale</option>
              <option value="new">New Arrivals</option>
              <option value="top-rated">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="pagination">
          <button className="page-button">Previous</button>
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <button className="page-button">Next</button>
        </div>
      </div>
    </div>
  )
}
