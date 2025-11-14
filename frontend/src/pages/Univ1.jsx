import React, { useEffect, useState } from 'react'
import LeadForm from '../components/LeadForm'

export default function Univ1() {
  const slug = 'sunrise-private-univ'
  const [data, setData] = useState(null)
  const [showFees, setShowFees] = useState(false)
  const [fees, setFees] = useState(null)

  useEffect(() => { 
    fetch((import.meta.env.VITE_BACKEND_URL || '') + `/api/universities/${slug}`)
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error('Failed to fetch university data:', err))
  }, [])

  async function openFees() {
    setShowFees(true)
    try {
      const r = await fetch((import.meta.env.VITE_BACKEND_URL || '') + `/api/universities/${slug}/course-fees`)
      setFees(await r.json())
    } catch (err) {
      console.error('Failed to fetch fees:', err)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-block mb-3">
                <span className="badge bg-blue-600 text-white border border-white/30">
                  <i className="fas fa-graduation-cap"></i> {data?.universityType}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {data?.name}
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                {data?.overview }
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openFees}
                className="btn btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
              >
                <i className="fas fa-dollar-sign"></i> Course Fees
              </button>
              <a
                href={data?.universityBrochureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary bg-white text-white-600 hover:bg-blue-50"
              >
                <i className="fas fa-download"></i> Download Brochure
              </a>
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                <i className="fas fa-paper-plane"></i> Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-8">
              <h2 className="section-title"><i className="fas fa-book-open"></i> Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {data?.overview}
              </p>
            </div>

            <div className="card p-8">
              <h2 className="section-title"><i className="fas fa-briefcase"></i> Placement Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="text-sm text-green-700 font-semibold mb-1">Highest Package</div>
                  <div className="text-3xl font-bold text-green-900">
                    {data?.placements?.highest || '—'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-700 font-semibold mb-1">Average Package</div>
                  <div className="text-3xl font-bold text-blue-900">
                    {data?.placements?.average || '—'}
                  </div>
                </div>
              </div>
              
              {data?.placements?.recruiters && data.placements.recruiters.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.placements.recruiters.map((recruiter, i) => (
                      <span key={i} className="badge">
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="card p-8">
              <h2 className="section-title"><i className="fas fa-building"></i> Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data?.facilities?.map((facility, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="text-2xl">✓</div>
                    <div className="text-gray-800 font-medium">{facility}</div>
                  </div>
                )) || (
                  <div className="col-span-full text-gray-500">Loading facilities...</div>
                )}
              </div>
            </div>

            <div className="card p-8">
              <h2 className="section-title"><i className="fas fa-book"></i> Courses Offered</h2>
              <div className="space-y-4">
                {data?.courses?.map((course, i) => (
                  <div key={i} className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{course.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 font-semibold">Duration:</span>
                        <div className="text-gray-900 font-medium mt-1">{course.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 font-semibold">Fee Range:</span>
                        <div className="text-gray-900 font-medium mt-1">{course.feeRange}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 font-semibold">Seats:</span>
                        <div className="text-gray-900 font-medium mt-1">{course.seats} seats</div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-gray-500">Loading courses...</div>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1" id="enquiry-form">
            <LeadForm 
              universityName={data?.name}
              onSuccess={() => {}} 
            />
          </div>
        </div>
      </div>

      {showFees && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowFees(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <h3 className="text-2xl font-bold"><i className="fas fa-dollar-sign"></i> Course-wise Fee Structure</h3>
            </div>
            
            <div className="p-6">
              {!fees ? (
                <div className="flex items-center justify-center py-12">
                  <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-gray-900 mb-4">{fees.university}</p>
                  {fees.fees.map((fee, i) => (
                    <div key={i} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="font-bold text-gray-900 mb-2">{fee.name}</div>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Fee: </span>
                          <span className="font-semibold text-blue-700">{fee.feeRange}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration: </span>
                          <span className="font-semibold text-gray-900">{fee.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowFees(false)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
