import Link from 'next/link'

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    icon: '📱',
    productCount: 1247,
    color: 'from-blue-500 to-cyan-500',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50'
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Clothing and accessories',
    icon: '👕',
    productCount: 856,
    color: 'from-pink-500 to-rose-500',
    bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-50'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Everything for your home',
    icon: '🏠',
    productCount: 692,
    color: 'from-green-500 to-emerald-500',
    bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Gear for active lifestyle',
    icon: '⚽',
    productCount: 534,
    color: 'from-orange-500 to-red-500',
    bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50'
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Books, movies, and music',
    icon: '📚',
    productCount: 423,
    color: 'from-purple-500 to-violet-500',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-violet-50'
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    description: 'Wellness and personal care',
    icon: '💄',
    productCount: 378,
    color: 'from-teal-500 to-cyan-500',
    bgPattern: 'bg-gradient-to-br from-teal-50 to-cyan-50'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car parts and accessories',
    icon: '🚗',
    productCount: 267,
    color: 'from-gray-600 to-gray-800',
    bgPattern: 'bg-gradient-to-br from-gray-50 to-gray-100'
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    description: 'Gourmet foods and drinks',
    icon: '🍕',
    productCount: 345,
    color: 'from-yellow-500 to-orange-500',
    bgPattern: 'bg-gradient-to-br from-yellow-50 to-orange-50'
  }
]

const featuredDeals = [
  {
    title: 'Summer Sale',
    subtitle: 'Up to 70% off',
    description: 'Get amazing deals on fashion, electronics, and more',
    link: '/categories/fashion',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    size: 'large'
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh & Trendy',
    description: 'Latest products just landed',
    link: '/products?filter=new',
    gradient: 'from-emerald-500 to-teal-600',
    size: 'small'
  },
  {
    title: 'Best Sellers',
    subtitle: 'Most Popular',
    description: 'Top-rated products',
    link: '/products?filter=bestseller',
    gradient: 'from-orange-500 to-red-600',
    size: 'small'
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Shop by{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of amazing products across our carefully curated categories
            </p>
            
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 animate-bounce"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:scale-105">
                {/* Gradient Background */}
                <div className={`h-40 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-8 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/25 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Category Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                  
                  {/* Product count with animated badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 group-hover:bg-primary-100 group-hover:text-primary-800 transition-colors duration-200">
                      {category.productCount.toLocaleString()} products
                    </span>
                    
                    {/* Arrow icon */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors duration-200">
                      <svg 
                        className="w-4 h-4 text-primary-600 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 transform rotate-45 translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-gray-600">Special curated selections just for you</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-96">
            {featuredDeals.map((deal, index) => (
              <Link
                key={deal.title}
                href={deal.link}
                className={`
                  ${deal.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'}
                  group relative overflow-hidden rounded-3xl bg-gradient-to-br ${deal.gradient} 
                  text-white transform hover:scale-105 transition-all duration-500 hover:shadow-2xl
                  min-h-[300px] lg:min-h-full
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 left-8 w-32 h-32 border-2 border-white rounded-full animate-spin-slow"></div>
                  <div className="absolute bottom-12 right-12 w-24 h-24 border border-white rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/50 rounded-full animate-ping"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-2 backdrop-blur-sm">
                      {deal.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {deal.title}
                  </h3>
                  
                  <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-md leading-relaxed">
                    {deal.description}
                  </p>
                  
                  <div className="inline-flex items-center bg-white/20 hover:bg-white/30 px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                    Shop Now
                    <svg className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-300 text-lg">Products</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-gray-300 text-lg">Sellers</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-gray-300 text-lg">Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                99%
              </div>
              <div className="text-gray-300 text-lg">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
