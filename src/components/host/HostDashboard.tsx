import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, Settings, Link as LinkIcon, PlusCircle } from 'lucide-react'
import PropertyList from './PropertyList'
import PropertyDetails from './PropertyDetails'
import HostSettings from './HostSettings'
import AddListingModal from './AddListingModal'

interface Property {
  id: number
  name: string
  location: string
  imageUrl: string
}

const HostDashboard: React.FC = () => {
  const location = useLocation()
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, name: 'Cozy Apartment', location: 'New York, NY', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' },
    { id: 2, name: 'Beach House', location: 'Miami, FL', imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' },
  ])

  const handleAddListing = (newListing: Omit<Property, 'id'>) => {
    const newId = Math.max(...properties.map(p => p.id), 0) + 1
    const newProperty = { ...newListing, id: newId }
    setProperties(prevProperties => [...prevProperties, newProperty])
    setIsAddListingModalOpen(false)
    console.log('New listing added:', newProperty) // Add this line for debugging
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Host Dashboard</h1>
        </div>
        <ul className="mt-6 flex-grow">
          <li>
            <Link
              to="/host"
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === '/host' ? 'bg-gray-100 border-r-4 border-[#FF5A5F]' : ''
              }`}
            >
              <Home className="mr-3" size={20} />
              Properties
            </Link>
          </li>
          <li>
            <Link
              to="/host/settings"
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === '/host/settings' ? 'bg-gray-100 border-r-4 border-[#FF5A5F]' : ''
              }`}
            >
              <Settings className="mr-3" size={20} />
              Settings
            </Link>
          </li>
        </ul>
        <div className="p-6 space-y-4">
          <button
            onClick={() => setIsAddListingModalOpen(true)}
            className="w-full flex items-center justify-center px-4 py-2 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF7E82] transition duration-300"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Listing Manually
          </button>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-center px-4 py-2 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF7E82] transition duration-300">
              <LinkIcon className="mr-2" size={20} />
              Connect Airbnb
            </button>
            <p className="text-sm text-gray-500 text-center">(Coming Soon)</p>
          </div>
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<PropertyList properties={properties} />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/settings" element={<HostSettings />} />
          </Routes>
        </div>
      </main>
      <AddListingModal
        isOpen={isAddListingModalOpen}
        onClose={() => setIsAddListingModalOpen(false)}
        onAddListing={handleAddListing}
      />
    </div>
  )
}

export default HostDashboard