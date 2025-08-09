import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Reigns Marketplace</h3>
          <p>Your beautiful market for everything you need.</p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Shop</h4>
          <Link href="/products">All Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/deals">Special Deals</Link>
          <Link href="/new-arrivals">New Arrivals</Link>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <Link href="/help">Help Center</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/shipping">Shipping Info</Link>
          <Link href="/returns">Returns</Link>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <Link href="/login">Sign In</Link>
          <Link href="/register">Register</Link>
          <Link href="/profile">My Account</Link>
          <Link href="/orders">Order History</Link>
        </div>

        <div className="footer-section">
          <h4>Sell</h4>
          <Link href="/sell">Start Selling</Link>
          <Link href="/seller-dashboard">Seller Dashboard</Link>
          <Link href="/seller-help">Seller Help</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2024 Reigns Marketplace. All rights reserved.</p>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
