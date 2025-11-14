import React, { useState } from 'react'

export default function LeadForm({ onSuccess, universityName }) {
  const [form, setForm] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    state: '', 
    courseInterested: '', 
    intakeYear: '2025',
    universityName: universityName || '',
    consent: false 
  })
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setStatus(null)
    
    if (!form.fullName || !form.email || !form.phone) {
      return setStatus({ error: 'Please fill required fields' })
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return setStatus({ error: 'Phone must be 10 digits' })
    }
    if (!form.consent) {
      return setStatus({ error: 'Consent required' })
    }

    setIsSubmitting(true)
    
    try {
      await fetch((process.env.REACT_APP_BACKEND_URL || '') + '/api/leads', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form) 
      })

      setStatus({ success: 'Submitted successfully! We\'ll contact you soon.' })
      onSuccess && onSuccess()
      setForm({ 
        fullName: '', 
        email: '', 
        phone: '', 
        state: '', 
        courseInterested: '', 
        intakeYear: '2025',
        universityName: universityName || '',
        consent: false 
      })
    } catch (err) {
      console.error(err)
      setStatus({ error: 'Submission failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6 lg:p-8 sticky top-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          <i className="fas fa-clipboard-list"></i> Enquiry Form
        </h3>
        <p className="text-sm text-gray-600">
          Fill the form below and we'll get back to you shortly
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={e => update('fullName', e.target.value)}
            className="input-field"
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            className="input-field"
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            className="input-field"
            placeholder="10 digit mobile number"
            maxLength="10"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            value={form.state}
            onChange={e => update('state', e.target.value)}
            className="input-field"
            placeholder="Your state"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Interested
          </label>
          <input
            type="text"
            value={form.courseInterested}
            onChange={e => update('courseInterested', e.target.value)}
            className="input-field"
            placeholder="e.g., B.Tech, MBA"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Intake Year
          </label>
          <select
            value={form.intakeYear}
            onChange={e => update('intakeYear', e.target.value)}
            className="input-field"
            disabled={isSubmitting}
          >
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
          </select>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <input
            type="checkbox"
            id="consent"
            checked={form.consent}
            onChange={e => update('consent', e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            disabled={isSubmitting}
          />
          <label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer">
            I consent to being contacted by the university regarding my application
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="-ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <><i className="fas fa-rocket"></i> Submit Application</>
          )}
        </button>

        {status?.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-sm text-red-700 font-medium">{status.error}</p>
          </div>
        )}
        
        {status?.success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-sm text-green-700 font-medium">{status.success}</p>
          </div>
        )}
      </form>
    </div>
  )
}
