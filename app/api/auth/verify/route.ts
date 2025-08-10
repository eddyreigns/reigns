import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization')
    
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No valid token provided' },
        { status: 401 }
      )
    }

    const token = authorization.split(' ')[1]

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      return NextResponse.json({
        valid: true,
        userId: decoded.userId,
        email: decoded.email,
        accountType: decoded.accountType
      })
    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
