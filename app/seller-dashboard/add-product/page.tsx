'use client'

import { useState } from 'react'

export default function AddProductPage() {
  const [formData, setFormData] = useState({
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

  const categories = [
    'Electronics',
    'Fashion & Apparel',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Health & Beauty',
    'Automotive',
    'Food & Beverage'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }))
  }

  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) => 
        i === index ? { ...spec, [field]: value } : spec
      )
    }))
  }

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Product data:', formData)
    console.log('Images:', images)
    // Handle product creation
  }

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <div className="page-header">
          <h1>Add New Product</h1>
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Basic Info</div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Details</div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>Images</div>
            <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>Review</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Basic Information</h2>
              
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief product description for listings"
                  maxLength={160}
                />
              </div>

              <div className="form-group">
                <label>Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed product description"
                  rows={6}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Product brand"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Product SKU"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setCurrentStep(2)}
                className="next-button"
              >
                Next: Product Details
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h2>Product Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Original Price (if on sale)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight (lbs)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0.0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Dimensions (inches)</label>
                <div className="dimensions-row">
                  <input
                    type="number"
                    name="dimensions.length"
                    value={formData.dimensions.length}
                    onChange={handleInputChange}
                    placeholder="Length"
                    step="0.1"
                  />
                  <input
                    type="number"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleInputChange}
                    placeholder="Width"
                    step="0.1"
                  />
                  <input
                    type="number"
                    name="dimensions.height"
                    value={formData.dimensions.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="wireless, bluetooth, audio, headphones"
                />
              </div>

              <div className="form-group">
                <label>Key Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="feature-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter a key feature"
                    />
                    {formData.features.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="remove-button"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="add-feature-button">
                  + Add Feature
                </button>
              </div>

              <div className="form-group">
                <label>Specifications</label>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="specification-input">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                      placeholder="Specification name"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                      placeholder="Specification value"
                    />
                    {formData.specifications.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="remove-button"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addSpecification} className="add-spec-button">
                  + Add Specification
                </button>
              </div>

              <div className="form-buttons">
                <button 
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="back-button"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="next-button"
                >
                  Next: Product Images
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h2>Product Images</h2>
              
              <div className="image-upload-section">
                <div className="upload-area">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <p>Click to upload images or drag and drop</p>
                    <span>PNG, JPG, GIF up to 10MB each</span>
                  </label>
                </div>

                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-button"
                      >
                        ×
                      </button>
                      {index === 0 && <span className="main-image-badge">Main</span>}
                    </div>
                  ))}
                </div>

                <p className="image-note">
                  First image will be used as the main product image. You can upload up to 10 images.
                </p>
              </div>

              <div className="form-buttons">
                <button 
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="back-button"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="next-button"
                >
                  Review Product
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-step">
              <h2>Review & Publish</h2>
              
              <div className="product-preview">
                <div className="preview-header">
                  <h3>{formData.name}</h3>
                  <div className="preview-price">
                    <span className="current-price">${formData.price}</span>
                    {formData.originalPrice && (
                      <span className="original-price">${formData.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="preview-details">
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>SKU:</strong> {formData.sku}</p>
                  <p><strong>Stock:</strong> {formData.stockQuantity} units</p>
                  <p><strong>Condition:</strong> {formData.condition}</p>
                </div>

                <div className="preview-description">
                  <h4>Description</h4>
                  <p>{formData.description}</p>
                </div>

                {formData.features.filter(f => f).length > 0 && (
                  <div className="preview-features">
                    <h4>Key Features</h4>
                    <ul>
                      {formData.features.filter(f => f).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="preview-images">
                  <h4>Images ({images.length})</h4>
                  <div className="preview-image-grid">
                    {images.slice(0, 4).map((image, index) => (
                      <img key={index} src={image} alt={`Product ${index + 1}`} />
                    ))}
                    {images.length > 4 && (
                      <div className="more-images">+{images.length - 4} more</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="publish-options">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  Publish immediately
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Feature this product
                </label>
              </div>

              <div className="form-buttons">
                <button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="back-button"
                >
                  Back
                </button>
                <button type="submit" className="publish-button">
                  Publish Product
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
