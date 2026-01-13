import React from 'react'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular' | 'product-card'
  width?: string | number
  height?: string | number
  count?: number
}

export function SkeletonLoader({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  count = 1 
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    'product-card': 'rounded-3xl'
  }

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? width : '200px'),
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  }

  if (variant === 'product-card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <div className={`${baseClasses} aspect-square rounded-2xl`} />
            <div className={`${baseClasses} h-4 rounded w-3/4`} />
            <div className={`${baseClasses} h-3 rounded w-1/2`} />
            <div className={`${baseClasses} h-6 rounded w-1/3`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={style}
        />
      ))}
    </div>
  )
}

export function ProductCardSkeleton() {
  return <SkeletonLoader variant="product-card" />
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLoader
          key={index}
          variant="text"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}
