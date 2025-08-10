import Link from 'next/link'

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    icon: '📱',
    productCount: 1247,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Clothing and accessories',
    icon: '👕',
    productCount: 856,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Everything for your home',
    icon: '🏠',
    productCount: 692,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Gear for active lifestyle',
    icon: '⚽',
    productCount: 534,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Books, movies, and music',
    icon: '📚',
    productCount: 423,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    description: 'Wellness and personal care',
    icon: '���',
    productCount: 378,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car parts and accessories',
    icon: '🚗',
    productCount: 267,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    description: 'Gourmet foods and drinks',
    icon: '🍕',
    productCount: 345,
    image: '/api/placeholder/400/300'
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600">Explore our wide range of product categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="card group hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="h-32 gradient-bg flex items-center justify-center relative overflow-hidden">
                <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
                  {category.productCount.toLocaleString()} products
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-80">
            <div className="md:col-span-2 gradient-bg rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Summer Sale</h3>
                <p className="text-xl mb-6 opacity-90">Up to 50% off on selected items</p>
                <Link href="/categories/fashion" className="inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 group">
                  Shop Now
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white text-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
                  <p className="mb-4 opacity-90">Latest products just in</p>
                  <Link href="/products?filter=new" className="text-sm font-semibold hover:underline">
                    Explore →
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Best Sellers</h3>
                  <p className="mb-4 opacity-90">Most popular items</p>
                  <Link href="/products?filter=bestseller" className="text-sm font-semibold hover:underline">
                    View All →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
