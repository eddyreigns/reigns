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
    <div className="product-card">
      <Link href={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <Image 
            src={product.image} 
            alt={product.name}
            width={300}
            height={300}
            className="product-image"
          />
          {product.isOnSale && (
            <div className="sale-badge">-{discountPercentage}%</div>
          )}
          <button className="wishlist-button">❤️</button>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-seller">by {product.seller}</p>
          
          <div className="product-rating">
            <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-text">({product.reviews} reviews)</span>
          </div>
          
          <div className="product-pricing">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  )
}
