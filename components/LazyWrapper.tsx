'use client'

import { Suspense, ComponentType } from 'react'
import { SkeletonLoader } from './SkeletonLoader'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export default function LazyWrapper({ 
  children, 
  fallback = <SkeletonLoader variant="rectangular" height={200} />,
  className = ''
}: LazyWrapperProps) {
  return (
    <Suspense fallback={<div className={className}>{fallback}</div>}>
      {children}
    </Suspense>
  )
}

// HOC for wrapping components with lazy loading
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  loadingComponent?: React.ReactNode
) {
  return function LazyComponent(props: T) {
    return (
      <LazyWrapper fallback={loadingComponent}>
        <Component {...props} />
      </LazyWrapper>
    )
  }
}
