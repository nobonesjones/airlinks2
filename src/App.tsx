import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LandingPage from './components/LandingPage'
import HostDashboard from './components/host/HostDashboard'
import GuestApp from './components/guest/GuestApp'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/host/*" element={<HostDashboard />} />
            <Route path="/guest/:propertyId" element={<GuestApp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App