import React from 'react'

interface PropertyInfoProps {
  propertyId: string | undefined
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ propertyId }) => {
  // Mock property data
  const property = {
    id: propertyId,
    name: 'Cozy Apartment',
    location: 'New York, NY',
    description: 'A beautiful apartment in the heart of New York City.',
    amenities: ['Wi-Fi', 'Kitchen', 'Air Conditioning', 'TV'],
    houseRules: ['No smoking', 'No pets', 'No parties'],
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
      <p className="text-gray-600 mb-4">{property.location}</p>
      <p className="mb-4">{property.description}</p>
      <h2 className="text-xl font-semibold mb-2">Amenities</h2>
      <ul className="list-disc list-inside mb-4">
        {property.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">House Rules</h2>
      <ul className="list-disc list-inside">
        {property.houseRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  )
}

export default PropertyInfo