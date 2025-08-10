'use client'

import { useEffect, useCallback, useRef } from 'react'

// Performance monitoring utilities
export function usePerformanceMonitor() {
  const metricsRef = useRef<PerformanceObserver[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor Core Web Vitals
    const observeMetric = (metricName: string, callback: (value: number) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === metricName) {
              callback(entry.value || (entry as any).startTime)
            }
          }
        })

        observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] })
        metricsRef.current.push(observer)
      } catch (error) {
        console.warn('Performance monitoring not supported:', error)
      }
    }

    // Observe key metrics
    observeMetric('first-contentful-paint', (value) => {
      console.log(`FCP: ${Math.round(value)}ms`)
    })

    observeMetric('largest-contentful-paint', (value) => {
      console.log(`LCP: ${Math.round(value)}ms`)
    })

    // Cleanup function
    return () => {
      metricsRef.current.forEach(observer => observer.disconnect())
      metricsRef.current = []
    }
  }, [])

  const measureComponent = useCallback((componentName: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`)
  }, [])

  return { measureComponent }
}

// Memory leak detection
export function useMemoryLeakDetection() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn('High memory usage detected')
        }
      }
    }

    const interval = setInterval(checkMemory, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])
}

// Bundle size monitoring
export function logBundleSize() {
  if (typeof window === 'undefined') return

  // Monitor resource loading
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('.js') && entry.transferSize) {
        console.log(`Bundle ${entry.name}: ${(entry.transferSize / 1024).toFixed(2)}KB`)
      }
    }
  })

  observer.observe({ entryTypes: ['resource'] })
  
  return () => observer.disconnect()
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return

  const criticalResources = [
    '/fonts/inter.woff2',
    '/images/hero-bg.webp',
    // Add more critical resources here
  ]

  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = resource.includes('font') ? 'font' : 'image'
    if (resource.includes('font')) {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  })
}
