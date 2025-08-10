'use client'

import { useEffect, memo } from 'react'
import { usePerformanceMonitor, preloadCriticalResources } from '../lib/performance'
import Link from 'next/link'

function Home() {
  const { measureComponent } = usePerformanceMonitor()

  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()

    // Measure component performance
    measureComponent('HomePage', () => {
      console.log('Home page rendered')
    })
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reigns
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
            My Beautiful Marketplace
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Discover extraordinary products from around the world and experience shopping like never before.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-2xl border">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold mb-2">Premium Shopping</h3>
              <p className="text-gray-600">Curated collection of premium products</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-2xl border">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Fast delivery worldwide</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-2xl border">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Award Winning</h3>
              <p className="text-gray-600">Outstanding customer service</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
              prefetch={true}
            >
              Explore Products
            </Link>
            <Link
              href="/seller-dashboard"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
              prefetch={false}
            >
              Start Selling
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Home)
