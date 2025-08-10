import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

// Mock user storage - In production, use a real database
let nextUserId = 4

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, accountType, shopName } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password || !accountType) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Generate profile picture and shop logo URLs
    const profilePicture = `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=100&h=100&fit=crop&crop=face`
    const shopLogo = accountType !== 'buyer' ? `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1560472354-b33ff0c44a43' : '1556742049-0cfed4f6a45d'}?w=100&h=100&fit=crop` : undefined

    // Create new user
    const newUser = {
      id: nextUserId.toString(),
      email: email.toLowerCase(),
      firstName,
      lastName,
      accountType,
      profilePicture,
      shopLogo,
      shopName: accountType !== 'buyer' ? (shopName || `${firstName}'s Store`) : undefined,
      isVerified: false,
      joinedAt: new Date().toISOString()
    }

    nextUserId++

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email,
        accountType: newUser.accountType 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Registration successful',
      user: newUser,
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
