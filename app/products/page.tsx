'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { ProductCardSkeleton } from '../../components/SkeletonLoader'
import LazyWrapper from '../../components/LazyWrapper'

// Dynamic imports for better code splitting
const ProductCard = dynamic(() => import('../../components/ProductCard'), {
  loading: () => <ProductCardSkeleton />,
  ssr: true
})

const SearchBar = dynamic(() => import('../../components/SearchBar'), {
  loading: () => <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />,
  ssr: false
})

const Pagination = dynamic(() => import('../../components/Pagination'), {
  loading: () => <div className="h-10 bg-gray-200 rounded animate-pulse" />,
  ssr: false
})

// Mock product data with realistic e-commerce products
const generateMockProducts = () => {
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Bluetooth Headphones',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      rating: 4.5,
      reviews: 1250,
      seller: 'AudioTech Pro',
      isOnSale: true
    },
    {
      id: '2',
      name: 'Smart Fitness Watch with Heart Monitor',
      price: 249.99,
      originalPrice: 329.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 892,
      seller: 'FitTech Solutions',
      isOnSale: true
    },
    {
      id: '3',
      name: 'Professional DSLR Camera Kit',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 456,
      seller: 'PhotoPro Gear',
      isOnSale: false
    },
    {
      id: '4',
      name: 'Ergonomic Office Chair',
      price: 449.99,
      originalPrice: 599.99,
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 324,
      seller: 'OfficeComfort',
      isOnSale: true
    },
    {
      id: '5',
      name: 'Mechanical Gaming Keyboard RGB',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      rating: 4.4,
      reviews: 678,
      seller: 'GameTech Pro',
      isOnSale: false
    },
    {
      id: '6',
      name: 'Ultra-Portable Laptop Stand',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      rating: 4.3,
      reviews: 234,
      seller: 'WorkSpace Solutions',
      isOnSale: true
    }
  ]

  // Generate more products for pagination
  const extendedProducts = []
  for (let i = 0; i < 24; i++) {
    const baseProduct = products[i % products.length]
    extendedProducts.push({
      ...baseProduct,
      id: `${baseProduct.id}-${Math.floor(i / products.length) + 1}`,
      name: `${baseProduct.name} ${i > 5 ? `- Model ${Math.floor(i / 6) + 1}` : ''}`,
      price: baseProduct.price + (Math.random() * 100 - 50),
    })
  }

  return extendedProducts
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  
  const productsPerPage = 8

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockProducts = generateMockProducts()
      setProducts(mockProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchTerm, sortBy])

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    return filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage)
  }, [filteredAndSortedProducts, currentPage, productsPerPage])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products from trusted sellers around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <LazyWrapper fallback={<div className="h-12 bg-gray-200 rounded-lg animate-pulse" />}>
              <SearchBar
                onSearch={setSearchTerm}
                placeholder="Search products..."
              />
            </LazyWrapper>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            
            <span className="text-sm text-gray-500">
              {filteredAndSortedProducts.length} products
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <LazyWrapper 
                  key={product.id}
                  fallback={<ProductCardSkeleton />}
                >
                  <ProductCard product={product} />
                </LazyWrapper>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <LazyWrapper fallback={<div className="h-10 bg-gray-200 rounded animate-pulse w-64" />}>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </LazyWrapper>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSortBy('name')
                setCurrentPage(1)
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
