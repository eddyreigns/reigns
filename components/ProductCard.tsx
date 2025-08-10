import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  seller: string
  isOnSale?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="card group overflow-hidden hover:scale-105 transition-all duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{discountPercentage}%
            </div>
          )}
          <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-white">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">by {product.seller}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <button className="w-full btn-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
