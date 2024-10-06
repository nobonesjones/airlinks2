import React, { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, Settings, PlusCircle } from 'lucide-react'
import PropertyList from './PropertyList'
import PropertyDetails from './PropertyDetails'
import HostSettings from './HostSettings'
import AddListingModal from './AddListingModal'

export interface Property {
  id: number
  name: string
  imageUrl: string
  description: string
  features: string[]
  listingRules: string
  entranceInstructions: string
  location: string
}

const HostDashboard: React.FC = () => {
  const location = useLocation()
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([
    { 
      id: 1, 
      name: 'Cozy Apartment', 
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'A beautiful cozy apartment in the heart of the city.',
      features: ['AI Chat', 'Recommended Places to Eat'],
      listingRules: 'No smoking, no pets',
      entranceInstructions: 'Use the keypad to enter. Code will be provided upon booking.',
      location: 'New York, NY'
    },
    { 
      id: 2, 
      name: 'Beach House', 
      imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      description: 'A stunning beach house with ocean views.',
      features: ['AI Chat', 'Location Guide'],
      listingRules: 'No parties, quiet hours after 10 PM',
      entranceInstructions: 'Key will be in the lockbox. Combination is 1234.',
      location: 'Malibu, CA'
    },
  ])

  const handleAddListing = (newListing: Omit<Property, 'id'>) => {
    const newId = Math.max(...properties.map(p => p.id), 0) + 1
    const newProperty = { ...newListing, id: newId }
    setProperties(prevProperties => [...prevProperties, newProperty])
    setIsAddListingModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Host Dashboard</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/host"
            className={`flex items-center px-4 py-2 text-gray-700 ${
              location.pathname === '/host' ? 'bg-gray-200' : ''
            }`}
          >
            <Home className="mr-3" size={20} />
            Properties
          </Link>
          <Link
            to="/host/settings"
            className={`flex items-center px-4 py-2 text-gray-700 ${
              location.pathname === '/host/settings' ? 'bg-gray-200' : ''
            }`}
          >
            <Settings className="mr-3" size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Your Properties</h2>
            <button
              onClick={() => setIsAddListingModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <PlusCircle className="mr-2" size={20} />
              Add Listing
            </button>
          </div>
          <Routes>
            <Route path="/" element={<PropertyList properties={properties} />} />
            <Route path="/property/:id" element={<PropertyDetails properties={properties} setProperties={setProperties} />} />
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