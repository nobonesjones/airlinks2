import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

interface Property {
  id: number
  name: string
  location: string
  imageUrl: string
}

interface PropertyListProps {
  properties: Property[]
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/host/property/${property.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img src={property.imageUrl} alt={property.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
              <p className="text-gray-600 flex items-center">
                <MapPin size={16} className="mr-2" />
                {property.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PropertyList