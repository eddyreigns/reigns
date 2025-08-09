'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductCard from '../../../components/ProductCard'

// Mock product data
const productData = {
  id: '1',
  name: 'Premium Wireless Headphones',
  price: 199,
  originalPrice: 249,
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  rating: 4.5,
  reviews: 128,
  seller: 'AudioTech',
  description: 'Experience premium audio quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and crystal-clear sound.',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Bluetooth 5.0 connectivity',
    'Quick charge - 5 minutes for 3 hours playback',
    'Premium leather ear cups',
    'Voice assistant compatible'
  ],
  specifications: {
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Impedance': '32 ohms',
    'Weight': '250g',
    'Bluetooth Version': '5.0',
    'Battery Life': '30 hours'
  },
  inStock: true,
  stockCount: 15
}

const relatedProducts = [
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    price: 149,
    image: '/api/placeholder/300/300',
    rating: 4.6,
    reviews: 89,
    seller: 'AudioTech'
  },
  {
    id: '3',
    name: 'Gaming Headset',
    price: 99,
    originalPrice: 129,
    image: '/api/placeholder/300/300',
    rating: 4.4,
    reviews: 156,
    seller: 'GameAudio',
    isOnSale: true
  }
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState('description')

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <Image
              src={productData.images[selectedImage]}
              alt={productData.name}
              width={600}
              height={600}
              className="product-main-image"
            />
          </div>
          <div className="image-thumbnails">
            {productData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              >
                <Image src={image} alt="" width={80} height={80} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-details">
          <div className="product-header">
            <h1>{productData.name}</h1>
            <p className="seller-info">Sold by <strong>{productData.seller}</strong></p>
            
            <div className="product-rating">
              <span className="stars">{'⭐'.repeat(Math.floor(productData.rating))}</span>
              <span className="rating-value">{productData.rating}</span>
              <span className="reviews-count">({productData.reviews} reviews)</span>
            </div>
          </div>

          <div className="pricing-section">
            <div className="price-info">
              <span className="current-price">${productData.price}</span>
              {productData.originalPrice && (
                <>
                  <span className="original-price">${productData.originalPrice}</span>
                  <span className="discount">
                    {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            
            <div className="stock-info">
              {productData.inStock ? (
                <span className="in-stock">✅ In Stock ({productData.stockCount} available)</span>
              ) : (
                <span className="out-of-stock">❌ Out of Stock</span>
              )}
            </div>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-button primary">
                Add to Cart - ${productData.price * quantity}
              </button>
              <button className="buy-now-button">
                Buy Now
              </button>
              <button className="wishlist-button">
                ❤️ Add to Wishlist
              </button>
            </div>
          </div>

          <div className="shipping-info">
            <div className="shipping-item">
              <span className="shipping-icon">🚚</span>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="shipping-item">
              <span className="shipping-icon">↩️</span>
              <span>30-day return policy</span>
            </div>
            <div className="shipping-item">
              <span className="shipping-icon">🛡️</span>
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div className="tab-buttons">
          <button 
            className={selectedTab === 'description' ? 'active' : ''}
            onClick={() => setSelectedTab('description')}
          >
            Description
          </button>
          <button 
            className={selectedTab === 'features' ? 'active' : ''}
            onClick={() => setSelectedTab('features')}
          >
            Features
          </button>
          <button 
            className={selectedTab === 'specifications' ? 'active' : ''}
            onClick={() => setSelectedTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={selectedTab === 'reviews' ? 'active' : ''}
            onClick={() => setSelectedTab('reviews')}
          >
            Reviews ({productData.reviews})
          </button>
        </div>

        <div className="tab-content">
          {selectedTab === 'description' && (
            <div className="description-content">
              <p>{productData.description}</p>
            </div>
          )}
          
          {selectedTab === 'features' && (
            <div className="features-content">
              <ul>
                {productData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedTab === 'specifications' && (
            <div className="specifications-content">
              <table>
                <tbody>
                  {Object.entries(productData.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {selectedTab === 'reviews' && (
            <div className="reviews-content">
              <div className="review-summary">
                <div className="average-rating">
                  <span className="rating-number">{productData.rating}</span>
                  <div className="stars-large">{'⭐'.repeat(Math.floor(productData.rating))}</div>
                  <span>Based on {productData.reviews} reviews</span>
                </div>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>John D.</strong>
                  <span className="review-rating">⭐⭐⭐⭐⭐</span>
                  <span className="review-date">2 days ago</span>
                </div>
                <p>Excellent sound quality and battery life. Highly recommend!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-grid">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
