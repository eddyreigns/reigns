export default function Home() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Reigns
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            My beautiful marketplace
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">🛍️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Shop Products</h3>
              <p className="text-gray-600">Discover amazing products from trusted sellers worldwide</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">🏪</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Start Selling</h3>
              <p className="text-gray-600">Join our marketplace and reach millions of customers</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">🚚</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="/products" className="btn-primary text-lg px-8 py-4 rounded-xl hover:transform hover:scale-105 transition-all duration-200">
              Browse Products
            </a>
            <a href="/seller-dashboard" className="btn-outline text-lg px-8 py-4 rounded-xl hover:transform hover:scale-105 transition-all duration-200">
              Become a Seller
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
