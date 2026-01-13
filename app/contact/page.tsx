'use client'

import { useState } from 'react'
import Link from 'next/link'

const contactMethods = [
  {
    icon: '📧',
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    value: 'support@reigns.com',
    action: 'mailto:support@reigns.com'
  },
  {
    icon: '💬',
    title: 'Live Chat',
    description: 'Chat with our support team instantly',
    value: 'Available 24/7',
    action: '#chat'
  },
  {
    icon: '📞',
    title: 'Phone Support',
    description: 'Speak directly with our team',
    value: '+1 (555) 123-REIGNS',
    action: 'tel:+15551237346'
  },
  {
    icon: '📍',
    title: 'Visit Us',
    description: 'Come to our headquarters',
    value: '123 Commerce St, NYC',
    action: 'https://maps.google.com'
  }
]

const departments = [
  {
    name: 'Customer Support',
    description: 'General questions, order help, returns',
    email: 'support@reigns.com',
    hours: '24/7'
  },
  {
    name: 'Seller Support',
    description: 'Seller onboarding, account management',
    email: 'sellers@reigns.com',
    hours: 'Mon-Fri 9AM-6PM PST'
  },
  {
    name: 'Technical Issues',
    description: 'Website bugs, technical difficulties',
    email: 'tech@reigns.com',
    hours: '24/7'
  },
  {
    name: 'Business Partnerships',
    description: 'Partnership opportunities, B2B sales',
    email: 'partnerships@reigns.com',
    hours: 'Mon-Fri 9AM-5PM PST'
  },
  {
    name: 'Press & Media',
    description: 'Media inquiries, press releases',
    email: 'press@reigns.com',
    hours: 'Mon-Fri 9AM-5PM PST'
  },
  {
    name: 'Legal & Compliance',
    description: 'Legal questions, policy inquiries',
    email: 'legal@reigns.com',
    hours: 'Mon-Fri 9AM-5PM PST'
  }
]

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the Orders page. You\'ll also receive tracking information via email once your order ships.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Digital products and personalized items cannot be returned.'
  },
  {
    question: 'How do I become a seller?',
    answer: 'You can apply to become a seller by visiting our Seller Dashboard and completing the registration process. We\'ll review your application within 2-3 business days.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard encryption and work with trusted payment processors to ensure your payment information is completely secure.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Check our shipping policy for more details.'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: 'Customer Support',
    message: '',
    priority: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      department: 'Customer Support',
      message: '',
      priority: 'normal'
    })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              We're here to help! Reach out to us through any of the channels below 
              and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {[
            { key: 'contact', label: 'Contact Form', icon: '📝' },
            { key: 'methods', label: 'Contact Methods', icon: '📞' },
            { key: 'departments', label: 'Departments', icon: '🏢' },
            { key: 'faq', label: 'FAQ', icon: '❓' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:scale-102'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-16">
          {activeTab === 'contact' && (
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h3 className="font-semibold text-green-800">Message Sent!</h3>
                        <p className="text-green-600">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        {departments.map(dept => (
                          <option key={dept.name} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Choose the method that works best for you. We're committed to providing 
                    excellent customer service and will respond as quickly as possible.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {contactMethods.map((method, index) => (
                    <Link
                      key={method.title}
                      href={method.action}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-100"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <p className="font-semibold text-blue-600">{method.value}</p>
                    </Link>
                  ))}
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🕒</span>
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Support</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone Support</span>
                      <span className="font-semibold">Mon-Fri 8AM-8PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Live Chat</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Choose Your Preferred Contact Method
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We offer multiple ways to get in touch. Pick the one that works best for your situation.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((method, index) => (
                  <Link
                    key={method.title}
                    href={method.action}
                    className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 text-center border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
                    <p className="font-semibold text-blue-600 text-lg">{method.value}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Contact the Right Department
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get faster responses by contacting the department that specializes in your inquiry.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((dept, index) => (
                  <div 
                    key={dept.name}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">📧</span>
                        <Link href={`mailto:${dept.email}`} className="text-blue-600 hover:underline font-medium">
                          {dept.email}
                        </Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">🕒</span>
                        <span className="text-gray-600 text-sm">{dept.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Find quick answers to common questions. Can't find what you're looking for? Contact us directly.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <details 
                    key={index}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="font-bold text-gray-900 text-lg">{faq.question}</h3>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">Still have questions?</p>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
