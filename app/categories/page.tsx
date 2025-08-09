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
    icon: '💄',
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
    <div className="categories-page">
      <div className="categories-container">
        <div className="categories-header">
          <h1>Shop by Category</h1>
          <p>Explore our wide range of product categories</p>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="category-card"
            >
              <div className="category-image">
                <span className="category-icon">{category.icon}</span>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="product-count">{category.productCount} products</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-categories">
          <h2>Featured Collections</h2>
          <div className="featured-grid">
            <div className="featured-card large">
              <h3>Summer Sale</h3>
              <p>Up to 50% off on selected items</p>
              <Link href="/categories/fashion" className="featured-link">Shop Now</Link>
            </div>
            <div className="featured-card">
              <h3>New Arrivals</h3>
              <p>Latest products just in</p>
              <Link href="/products?filter=new" className="featured-link">Explore</Link>
            </div>
            <div className="featured-card">
              <h3>Best Sellers</h3>
              <p>Most popular items</p>
              <Link href="/products?filter=bestseller" className="featured-link">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
