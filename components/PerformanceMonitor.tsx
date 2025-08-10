'use client'

import { useEffect, useState } from 'react'
import { usePerformanceMonitor, useMemoryLeakDetection } from '../lib/performance'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  cls?: number
  fid?: number
  ttfb?: number
  memoryUsage?: number
  bundleSize?: number
  renderTime?: number
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isVisible, setIsVisible] = useState(false)
  const { measureComponent } = usePerformanceMonitor()
  
  useMemoryLeakDetection()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const collectMetrics = () => {
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      // Get paint timing
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint')
      
      // Memory usage (if available)
      const memory = (performance as any).memory
      
      setMetrics(prev => ({
        ...prev,
        fcp: fcpEntry?.startTime,
        lcp: lcpEntries[lcpEntries.length - 1]?.startTime,
        ttfb: navigation?.responseStart - navigation?.requestStart,
        memoryUsage: memory ? memory.usedJSHeapSize / 1024 / 1024 : undefined, // MB
      }))
    }

    // Collect initial metrics
    collectMetrics()

    // Collect metrics periodically
    const interval = setInterval(collectMetrics, 5000)

    // Listen for performance entries
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }))
        }
        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }))
        }
        if (entry.entryType === 'layout-shift') {
          setMetrics(prev => ({ 
            ...prev, 
            cls: (prev.cls || 0) + (entry as any).value 
          }))
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error)
    }

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const formatMs = (value?: number) => value ? `${Math.round(value)}ms` : 'N/A'
  const formatMB = (value?: number) => value ? `${value.toFixed(1)}MB` : 'N/A'
  const formatScore = (value?: number) => value ? value.toFixed(3) : 'N/A'

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-600'
    if (value <= thresholds[1]) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Performance Monitor"
      >
        📊
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Performance Metrics</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            {/* Core Web Vitals */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Core Web Vitals</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>FCP (First Contentful Paint):</span>
                  <span className={metrics.fcp ? getScoreColor(metrics.fcp, [1800, 3000]) : ''}>
                    {formatMs(metrics.fcp)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>LCP (Largest Contentful Paint):</span>
                  <span className={metrics.lcp ? getScoreColor(metrics.lcp, [2500, 4000]) : ''}>
                    {formatMs(metrics.lcp)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>CLS (Cumulative Layout Shift):</span>
                  <span className={metrics.cls ? getScoreColor(metrics.cls, [0.1, 0.25]) : ''}>
                    {formatScore(metrics.cls)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>FID (First Input Delay):</span>
                  <span className={metrics.fid ? getScoreColor(metrics.fid, [100, 300]) : ''}>
                    {formatMs(metrics.fid)}
                  </span>
                </div>
              </div>
            </div>

            {/* Other Metrics */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Other Metrics</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>TTFB (Time to First Byte):</span>
                  <span>{formatMs(metrics.ttfb)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory Usage:</span>
                  <span>{formatMB(metrics.memoryUsage)}</span>
                </div>
              </div>
            </div>

            {/* Performance Tips */}
            <div className="pt-2 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Tips</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• FCP should be under 1.8s</div>
                <div>• LCP should be under 2.5s</div>
                <div>• CLS should be under 0.1</div>
                <div>• FID should be under 100ms</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
