import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GuestApp from './components/guest/GuestApp'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import HostDashboard from './components/host/HostDashboard'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/host/*" element={<HostDashboard />} />
            <Route path="/guest/:propertyId" element={<GuestApp />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App