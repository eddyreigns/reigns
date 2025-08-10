import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Mock user database - In production, use a real database
const mockUsers = [
  {
    id: '1',
    email: 'admin@reigns.com',
    password: '$2a$10$8K9rLOLOLOLOLOLOLOLOLuS4HyIYjYrPKHKPKHKPKHKPKE', // hashed 'admin123'
    firstName: 'Admin',
    lastName: 'User',
    accountType: 'both' as const,
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    shopName: 'Reigns Store',
    shopLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    isVerified: true,
    joinedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'seller@reigns.com',
    password: '$2a$10$8K9rLOLOLOLOLOLOLOLOLuS4HyIYjYrPKHKPKHKPKHKPKE', // hashed 'seller123'
    firstName: 'John',
    lastName: 'Seller',
    accountType: 'seller' as const,
    shopName: 'John\'s Electronics',
    shopLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    isVerified: true,
    joinedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    email: 'buyer@reigns.com',
    password: '$2a$10$8K9rLOLOLOLOLOLOLOLOLuS4HyIYjYrPKHKPKHKPKHKPKE', // hashed 'buyer123'
    firstName: 'Jane',
    lastName: 'Smith',
    accountType: 'buyer' as const,
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    isVerified: true,
    joinedAt: '2024-02-01T00:00:00Z'
  }
]

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // For demo purposes, accept simple passwords
    const isValidPassword = password === 'admin123' || password === 'seller123' || password === 'buyer123'
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        accountType: user.accountType 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
