'use client'

// Client-side caching utilities
class ClientCache {
  private cache = new Map()
  private expiryMap = new Map()

  set(key: string, value: any, ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache.set(key, value)
    this.expiryMap.set(key, Date.now() + ttl)
  }

  get(key: string) {
    const expiry = this.expiryMap.get(key)
    if (expiry && Date.now() > expiry) {
      this.delete(key)
      return null
    }
    return this.cache.get(key) || null
  }

  delete(key: string) {
    this.cache.delete(key)
    this.expiryMap.delete(key)
  }

  clear() {
    this.cache.clear()
    this.expiryMap.clear()
  }

  has(key: string) {
    const expiry = this.expiryMap.get(key)
    if (expiry && Date.now() > expiry) {
      this.delete(key)
      return false
    }
    return this.cache.has(key)
  }

  // Memory management
  cleanup() {
    const now = Date.now()
    for (const [key, expiry] of this.expiryMap.entries()) {
      if (now > expiry) {
        this.delete(key)
      }
    }
  }
}

export const clientCache = new ClientCache()

// Auto cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => clientCache.cleanup(), 5 * 60 * 1000)
}

// React hook for cached API calls
export function useCachedFetch<T>(url: string, options: RequestInit = {}) {
  const cacheKey = `${url}_${JSON.stringify(options)}`
  
  const fetchData = async (): Promise<T> => {
    const cached = clientCache.get(cacheKey)
    if (cached) {
      return cached
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    clientCache.set(cacheKey, data)
    return data
  }

  return { fetchData, cacheKey }
}

// SessionStorage cache with expiry
export class SessionCache {
  static set(key: string, value: any, ttl = 30 * 60 * 1000) { // 30 minutes default
    if (typeof window === 'undefined') return

    const item = {
      value,
      expiry: Date.now() + ttl
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  static get(key: string) {
    if (typeof window === 'undefined') return null

    const itemStr = sessionStorage.getItem(key)
    if (!itemStr) return null

    try {
      const item = JSON.parse(itemStr)
      if (Date.now() > item.expiry) {
        sessionStorage.removeItem(key)
        return null
      }
      return item.value
    } catch {
      sessionStorage.removeItem(key)
      return null
    }
  }

  static delete(key: string) {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem(key)
  }

  static clear() {
    if (typeof window === 'undefined') return
    sessionStorage.clear()
  }
}

// LocalStorage cache with expiry (for persistent data)
export class LocalCache {
  static set(key: string, value: any, ttl = 24 * 60 * 60 * 1000) { // 24 hours default
    if (typeof window === 'undefined') return

    const item = {
      value,
      expiry: Date.now() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  static get(key: string) {
    if (typeof window === 'undefined') return null

    const itemStr = localStorage.getItem(key)
    if (!itemStr) return null

    try {
      const item = JSON.parse(itemStr)
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key)
        return null
      }
      return item.value
    } catch {
      localStorage.removeItem(key)
      return null
    }
  }

  static delete(key: string) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }

  static clear() {
    if (typeof window === 'undefined') return
    localStorage.clear()
  }
}
