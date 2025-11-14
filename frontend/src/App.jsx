import React from 'react'
import Univ1 from './pages/Univ1'
import Univ2 from './pages/Univ2'
import KollegeApplyDashboard from './pages/KollegeApplyDashboard'

export default function App({ slug }) {
  if (!slug) {
    return <KollegeApplyDashboard />
  }

  return slug === 'sunrise-private-univ' ? <Univ1 /> : <Univ2 />
}
