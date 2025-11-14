import React, { useEffect, useState } from 'react'

export default function KollegeApplyDashboard() {
  const [universities, setUniversities] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      const envBase = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, '')
      const primaryUrl = envBase ? envBase + '/api/universities' : '/api/universities'
      const tried = []
      for (const url of [primaryUrl, '/api/universities']) {
        if (tried.includes(url)) continue
        tried.push(url)
        try {
          console.log('[Dashboard] Fetching universities from', url)
          const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
          const ct = res.headers.get('content-type') || ''
          if (!res.ok) throw new Error('HTTP ' + res.status)
          if (!ct.includes('application/json')) {
            const textPreview = (await res.text()).slice(0, 120)
            throw new Error('Unexpected content-type: ' + ct + ' preview: ' + textPreview)
          }
          const data = await res.json()
          setUniversities(Array.isArray(data) ? data : [])
          setError(null)
          return
        } catch (e) {
          console.warn('Attempt failed for', url, e)
          // continue to next attempt
        }
      }
      setError('Failed to load universities after attempts')
      setUniversities([])
    }
    load()
  }, [])

  const toPageHref = (slug) => {
    if (slug === 'sunrise-private-univ') return '/univ1'
    if (slug === 'crescent-institute') return '/univ2'
    return '/'
  }

  const Header = (
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
  )

  if (!universities) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          {Header}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-200" />
                  <div className="w-6 h-6 bg-gray-200 rounded" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
                <div className="flex gap-2 mt-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-6 w-24 bg-gray-200 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <div className="card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto" />
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
                  <div className="h-3 bg-gray-200 rounded w-40 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {Header}

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {universities.map((u, i) => (
            <a key={u.slug} href={toPageHref(u.slug)} className="card p-8 group block">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${i % 2 === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'}`}>
                  <i className={`fas ${i % 2 === 0 ? 'fa-graduation-cap' : 'fa-university'} text-white`}></i>
                </div>
                <svg className={`w-6 h-6 text-gray-400 ${i % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <h2 className={`text-2xl font-bold text-gray-900 mb-3 transition-colors ${i % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`}>
                {u.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {u.overview}
              </p>

              <div className="flex flex-wrap gap-2">
                {(u.courses || []).slice(0, 3).map((c, idx) => (
                  <span key={idx} className="badge text-xs">{c.name}</span>
                ))}
              </div>
            </a>
          ))}
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
