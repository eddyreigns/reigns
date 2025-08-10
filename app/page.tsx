export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main hero content */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-16 border border-white/20 animate-slide-up">
            {/* Logo and tagline */}
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-glow">
                  Reigns
                </span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 mb-4 font-light">
                My Beautiful Marketplace
              </p>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover extraordinary products from around the world, connect with amazing sellers, and experience shopping like never before.
              </p>
            </div>
            
            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up animate-stagger-1">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🛍️</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Shopping</h3>
                <p className="text-gray-600 leading-relaxed">
                  Curated collection of premium products from verified sellers worldwide with guaranteed quality.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl border border-emerald-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up animate-stagger-2">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience blazing fast delivery with our global network of fulfillment centers and express shipping.
                </p>
              </div>
              
              <div className="group bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl border border-purple-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up animate-stagger-3">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏆</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Award Winning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Recognized globally for outstanding customer service and innovative marketplace solutions.
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/products" 
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold px-12 py-5 rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[250px]"
              >
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              
              <a 
                href="/seller-dashboard" 
                className="group relative overflow-hidden border-3 border-indigo-600 text-indigo-600 text-xl font-bold px-12 py-5 rounded-2xl hover:bg-indigo-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300 min-w-[250px] bg-white/50 backdrop-blur-sm"
              >
                <span className="relative z-10">Start Selling</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-gray-500 mb-6 text-lg">Trusted by millions worldwide</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-3xl font-bold text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">2M+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">500K+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                  <div className="text-gray-600">Sellers</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating action button */}
          <div className="fixed bottom-8 right-8 z-50">
            <button className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse">
              <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
