import React from 'react'
import Univ1 from './pages/Univ1'
import Univ2 from './pages/Univ2'

export default function App({ slug }) {
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="badge text-lg px-6 py-2">
                <i className="fas fa-graduation-cap"></i> University Landing Pages
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Discover Your Future
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top universities and find the perfect program to launch your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <a 
              href="/univ1" 
              className="card p-8 group block"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
                  <i className="fas fa-graduation-cap text-white"></i>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Sunrise Private University
              </h2>
              <p className="text-gray-600 mb-4">
                Leading institution focused on engineering and management with industry-aligned curriculum and excellent placements.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="badge text-xs">Engineering</span>
                <span className="badge text-xs">Management</span>
                <span className="badge text-xs">Research</span>
              </div>
            </a>

            <a 
              href="/univ2" 
              className="card p-8 group block"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl">
                  <i className="fas fa-university text-white"></i>
                </div>
                <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Crescent Institute of Technology
              </h2>
              <p className="text-gray-600 mb-4">
                Premier institute emphasizing research, innovation, and strong industry connections for comprehensive learning.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="badge text-xs">Technology</span>
                <span className="badge text-xs">Innovation</span>
                <span className="badge text-xs">Placements</span>
              </div>
            </a>
          </div>

          <div className="card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2"><i className="fas fa-bullseye"></i></div>
                <div className="font-semibold text-gray-900 mb-1">Easy Application</div>
                <div className="text-sm text-gray-600">Quick online form submission</div>
              </div>
              <div>
                <div className="text-3xl mb-2"><i className="fas fa-briefcase"></i></div>
                <div className="font-semibold text-gray-900 mb-1">Career Support</div>
                <div className="text-sm text-gray-600">Top placement assistance</div>
              </div>
              <div>
                <div className="text-3xl mb-2"><i className="fas fa-trophy"></i></div>
                <div className="font-semibold text-gray-900 mb-1">Excellence</div>
                <div className="text-sm text-gray-600">World-class education</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>Built with React + Node.js + MongoDB</p>
            <p className="mt-2">Lead forms integrated with backend & Pipedream workflow</p>
          </div>
        </div>
      </div>
    )
  }

  return slug === 'sunrise-private-univ' ? <Univ1 /> : <Univ2 />
}
