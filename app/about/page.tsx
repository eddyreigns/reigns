'use client'

import { useState } from 'react'
import Link from 'next/link'
import OptimizedImage from '../../components/OptimizedImage'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Visionary leader with 15+ years in e-commerce and marketplace development.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Tech innovator passionate about creating seamless user experiences.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Creative strategist focused on building meaningful brand connections.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'David Kim',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Operations expert ensuring smooth marketplace experiences for all users.',
    linkedin: '#',
    twitter: '#'
  }
]

const milestones = [
  {
    year: '2020',
    title: 'Founded Reigns',
    description: 'Started with a vision to create the most beautiful marketplace experience.'
  },
  {
    year: '2021',
    title: '10,000 Products',
    description: 'Reached our first major milestone with diverse product catalog.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded to serve customers and sellers worldwide.'
  },
  {
    year: '2023',
    title: '1M+ Customers',
    description: 'Celebrated serving over one million happy customers.'
  },
  {
    year: '2024',
    title: 'Innovation Focus',
    description: 'Leading the future of e-commerce with AI and sustainable practices.'
  }
]

const values = [
  {
    icon: '🎯',
    title: 'Customer First',
    description: 'Every decision we make is guided by what\'s best for our customers and their experience.'
  },
  {
    icon: '🤝',
    title: 'Trust & Transparency',
    description: 'Building lasting relationships through honest communication and reliable service.'
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'Committed to environmentally responsible practices and supporting eco-friendly products.'
  },
  {
    icon: '⚡',
    title: 'Innovation',
    description: 'Continuously evolving with cutting-edge technology to enhance user experience.'
  },
  {
    icon: '🌍',
    title: 'Global Community',
    description: 'Connecting people worldwide through commerce and shared experiences.'
  },
  {
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Creating delightful experiences through thoughtful design and attention to detail.'
  }
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-white/15 rounded-full animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              About <span className="text-yellow-400">Reigns</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              We're building the future of e-commerce with beautiful design, 
              innovative technology, and a passion for connecting people worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {[
            { key: 'story', label: 'Our Story', icon: '📖' },
            { key: 'team', label: 'Our Team', icon: '👥' },
            { key: 'values', label: 'Our Values', icon: '💝' },
            { key: 'timeline', label: 'Timeline', icon: '⏰' }
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
          {activeTab === 'story' && (
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Our Journey Began with a 
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Simple Vision</span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    In 2020, we set out to create more than just another marketplace. We envisioned a platform where 
                    beauty meets functionality, where every interaction feels delightful, and where both buyers and 
                    sellers can thrive together.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Today, Reigns serves millions of customers worldwide, connecting them with unique products from 
                    thousands of passionate sellers. Our commitment to excellence drives every feature we build and 
                    every experience we craft.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">1M+</div>
                    <div className="text-gray-600">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                    <div className="text-gray-600">Sellers</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl rotate-3 opacity-20"></div>
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Our team working together"
                  width={600}
                  height={400}
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Meet Our 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Amazing Team</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Behind every great platform is a passionate team of innovators, dreamers, and builders 
                  working together to create something extraordinary.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={member.name} 
                    className="group text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full scale-105 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="relative z-10 w-48 h-48 mx-auto rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="flex justify-center gap-3">
                      <Link 
                        href={member.linkedin}
                        className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center text-blue-600 transition-colors duration-200"
                      >
                        💼
                      </Link>
                      <Link 
                        href={member.twitter}
                        className="w-10 h-10 bg-sky-100 hover:bg-sky-200 rounded-full flex items-center justify-center text-sky-600 transition-colors duration-200"
                      >
                        🐦
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Our Core 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Values</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  These values guide every decision we make and shape the culture we're building together.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={value.title}
                    className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Our 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  From a small startup to a global marketplace, here are the key moments that shaped our story.
                </p>
              </div>
              
              <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div 
                      key={milestone.year}
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10 hover:scale-125 transition-transform duration-300"></div>
                      
                      <div className="w-5/12"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a buyer looking for amazing products or a seller wanting to reach new customers, 
            we'd love to have you as part of the Reigns family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Join as Customer
            </Link>
            <Link 
              href="/seller-dashboard"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Start Selling
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
