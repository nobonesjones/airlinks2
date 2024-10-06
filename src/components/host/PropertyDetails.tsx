import React from 'react'
import { useParams } from 'react-router-dom'
import { Book, Upload, MapPin, Home } from 'lucide-react'

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock property data
  const property = {
    id: Number(id),
    name: 'Cozy Apartment',
    location: 'New York, NY',
    description: 'A beautiful apartment in the heart of New York City.',
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-[#FF5A5F] text-white rounded-full mr-4">
          <Home size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{property.name}</h2>
          <p className="text-gray-600 flex items-center mt-1">
            <MapPin size={16} className="mr-2" />
            {property.location}
          </p>
        </div>
      </div>
      <p className="text-lg mb-6">{property.description}</p>
      <div className="flex space-x-4">
        <button className="flex items-center px-6 py-3 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF7E82] transition duration-300">
          <Book className="mr-2" size={20} />
          Upload Welcome Book
        </button>
        <button className="flex items-center px-6 py-3 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF7E82] transition duration-300">
          <Upload className="mr-2" size={20} />
          Upload House Rules
        </button>
      </div>
    </div>
  )
}

export default PropertyDetails