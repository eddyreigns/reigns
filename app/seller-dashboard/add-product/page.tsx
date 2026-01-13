'use client'

import { useState, useCallback } from 'react'
import { useAuth, withAuth } from '../../../lib/auth'

interface FormData {
  name: string
  description: string
  shortDescription: string
  category: string
  subcategory: string
  price: string
  originalPrice: string
  sku: string
  stockQuantity: string
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  tags: string
  brand: string
  condition: string
  shippingClass: string
  returnPolicy: string
  warranty: string
  features: string[]
  specifications: { key: string; value: string }[]
}

function AddProductPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    sku: '',
    stockQuantity: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    tags: '',
    brand: '',
    condition: 'new',
    shippingClass: 'standard',
    returnPolicy: '30-day',
    warranty: '',
    features: [''],
    specifications: [{ key: '', value: '' }]
  })

  const [images, setImages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'fashion', label: 'Fashion & Apparel', icon: '👕' },
    { value: 'home', label: 'Home & Garden', icon: '🏠' },
    { value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
    { value: 'books', label: 'Books & Media', icon: '📚' },
    { value: 'health', label: 'Health & Beauty', icon: '💄' },
    { value: 'automotive', label: 'Automotive', icon: '🚗' },
    { value: 'food', label: 'Food & Beverage', icon: '🍕' }
  ]

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📝', description: 'Product name and description' },
    { number: 2, title: 'Details', icon: '⚙️', description: 'Pricing and specifications' },
    { number: 3, title: 'Images', icon: '📷', description: 'Product photos' },
    { number: 4, title: 'Review', icon: '✅', description: 'Final review and publish' }
  ]

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }, [])

  const addFeature = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }, [])

  const updateFeature = useCallback((index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }, [])

  const removeFeature = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }, [])

  const addSpecification = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }))
  }, [])

  const updateSpecification = useCallback((index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }))
  }, [])

  const removeSpecification = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }))
  }, [])

  const handleImageUpload = useCallback((files: FileList) => {
    const newImages = Array.from(files).map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages].slice(0, 10)) // Max 10 images
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageUpload(files)
    }
  }, [handleImageUpload])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeImage = useCallback((index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Product data:', formData)
    console.log('Images:', images)
    
    setIsSubmitting(false)
    // Redirect to success page or dashboard
  }

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.description && formData.category && formData.sku
      case 2:
        return formData.price && formData.stockQuantity
      case 3:
        return images.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Add New Product
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a stunning product listing that attracts customers and drives sales
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-shrink-0">
                <div className={`flex flex-col items-center group cursor-pointer ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 mb-2 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                  } ${currentStep === step.number ? 'ring-4 ring-blue-200' : ''}`}>
                    {currentStep > step.number ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-2xl">{step.icon}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs opacity-75 mt-1 max-w-20">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 lg:w-24 h-1 mx-4 transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    📝
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                    <p className="text-gray-600">Tell us about your product</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter an eye-catching product name"
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder="Brief description for search results and listings"
                      maxLength={160}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="text-right text-sm text-gray-500 mt-2">
                      {formData.shortDescription.length}/160 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Full Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide a detailed description of your product. Include key features, benefits, and what makes it special."
                      rows={6}
                      required
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Product brand or manufacturer"
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        SKU (Stock Keeping Unit) *
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="e.g., PROD-001, WH-BT-001"
                        required
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Condition
                      </label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="new">✨ New</option>
                        <option value="used">🔄 Used</option>
                        <option value="refurbished">🛠️ Refurbished</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-12">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!canProceed(1)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Next: Product Details →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Product Details */}
            {currentStep === 2 && (
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    ⚙️
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <p className="text-gray-600">Pricing, inventory, and specifications</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      💰 Pricing Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Current Price * ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          step="0.01"
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Original Price (if on sale) ($)
                        </label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          step="0.01"
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inventory */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      📦 Inventory & Shipping
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Stock Quantity *
                        </label>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          required
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="0.0"
                          step="0.1"
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Dimensions (inches)
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="number"
                          name="dimensions.length"
                          value={formData.dimensions.length}
                          onChange={handleInputChange}
                          placeholder="Length"
                          step="0.1"
                          className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="number"
                          name="dimensions.width"
                          value={formData.dimensions.width}
                          onChange={handleInputChange}
                          placeholder="Width"
                          step="0.1"
                          className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="number"
                          name="dimensions.height"
                          value={formData.dimensions.height}
                          onChange={handleInputChange}
                          placeholder="Height"
                          step="0.1"
                          className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="wireless, bluetooth, audio, headphones, premium"
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-sm text-gray-500 mt-2">Help customers find your product with relevant keywords</p>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Key Features
                    </label>
                    <div className="space-y-3">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder="Enter a key feature or benefit"
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          {formData.features.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="w-12 h-12 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={addFeature} 
                      className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Feature
                    </button>
                  </div>

                  {/* Specifications */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Specifications
                    </label>
                    <div className="space-y-3">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                            placeholder="Specification name (e.g., Battery Life)"
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                              placeholder="Value (e.g., 30 hours)"
                              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            {formData.specifications.length > 1 && (
                              <button 
                                type="button"
                                onClick={() => removeSpecification(index)}
                                className="w-12 h-12 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={addSpecification} 
                      className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Specification
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    ← Back to Basic Info
                  </button>
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceed(2)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Next: Product Images →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {currentStep === 3 && (
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    📷
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Product Images</h2>
                    <p className="text-gray-600">Upload high-quality photos to showcase your product</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                      isDragOver 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                    />
                    <div className="text-6xl mb-4">📷</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Drag & drop images here
                    </h3>
                    <p className="text-gray-600 mb-6">
                      or click to browse from your computer
                    </p>
                    <div className="text-sm text-gray-500">
                      <p>• Support: PNG, JPG, GIF up to 10MB each</p>
                      <p>• Recommended: Square images, 1000x1000px minimum</p>
                      <p>• Maximum: 10 images per product</p>
                    </div>
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Uploaded Images ({images.length}/10)
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div 
                            key={index} 
                            className="relative group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="aspect-square">
                              <img 
                                src={image} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                Main Image
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Add More Button */}
                        {images.length < 10 && (
                          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                              className="hidden"
                            />
                            <div className="text-3xl mb-2">➕</div>
                            <div className="text-sm font-medium text-gray-600">Add More</div>
                          </label>
                        )}
                      </div>
                      
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-blue-800 text-sm">
                            <p className="font-medium mb-1">Image Tips:</p>
                            <ul className="space-y-1">
                              <li>• First image will be your main product photo</li>
                              <li>• Show different angles and use cases</li>
                              <li>• Use good lighting and clear, crisp images</li>
                              <li>• Include lifestyle shots to show scale and usage</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    ��� Back to Details
                  </button>
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    disabled={!canProceed(3)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Review & Publish →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Publish */}
            {currentStep === 4 && (
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                    ✅
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Review & Publish</h2>
                    <p className="text-gray-600">Final review before publishing your product</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Product Preview */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Product Images */}
                      <div>
                        {images.length > 0 ? (
                          <div>
                            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                              <img 
                                src={images[0]} 
                                alt="Main product image" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {images.length > 1 && (
                              <div className="grid grid-cols-4 gap-2">
                                {images.slice(1, 5).map((image, index) => (
                                  <div key={index} className="aspect-square bg-white rounded-lg shadow overflow-hidden">
                                    <img 
                                      src={image} 
                                      alt={`Product image ${index + 2}`} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                                {images.length > 5 && (
                                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm font-medium">
                                    +{images.length - 5}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                            <div className="text-gray-400">No images uploaded</div>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {formData.name || 'Product Name'}
                          </h3>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl font-bold text-green-600">
                              ${formData.price || '0.00'}
                            </div>
                            {formData.originalPrice && (
                              <div className="text-xl text-gray-500 line-through">
                                ${formData.originalPrice}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>🏷️ {formData.category || 'Category'}</span>
                            <span>📦 {formData.stockQuantity || '0'} in stock</span>
                            <span>⭐ {formData.condition}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-600 leading-relaxed">
                            {formData.description || 'No description provided'}
                          </p>
                        </div>

                        {formData.features.filter(f => f).length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                            <ul className="space-y-1">
                              {formData.features.filter(f => f).map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-600">
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Publishing Options */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Publishing Options</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Publish immediately</span>
                          <p className="text-sm text-gray-600">Make this product visible to customers right away</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Feature this product</span>
                          <p className="text-sm text-gray-600">Show in featured products section (additional fees may apply)</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Enable notifications</span>
                          <p className="text-sm text-gray-600">Receive emails about orders, questions, and reviews</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    ← Back to Images
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Publishing...
                      </span>
                    ) : (
                      '🎉 Publish Product'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            Our seller support team is here to help you create amazing product listings that sell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:sellers@reigns.com"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a 
              href="tel:+254724293511"
              className="inline-flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(AddProductPage)
