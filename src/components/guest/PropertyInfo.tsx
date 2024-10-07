import React from 'react'
import { Calendar, MapPin } from 'lucide-react'

interface PropertyInfoProps {
  propertyId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  propertyId,
  guestName,
  checkIn,
  checkOut,
}) => {
  // Mock property data
  const property = {
    id: propertyId,
    name: 'City Walk, Dubai',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    location: 'Dubai, UAE',
    description: 'A beautiful apartment in the heart of Dubai.',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-3xl font-bold text-white">{property.name}</h1>
          <p className="text-white flex items-center mt-2">
            <MapPin size={16} className="mr-2" />
            {property.location}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {guestName}!</h2>
          <p className="text-gray-600">
            Hey, welcome to our Airbnb. We hope you have an amazing stay. Message us for anything, at any time, and we will be glad to help.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <Calendar size={20} className="text-[#FF5A5F] mr-2" />
            <span className="font-semibold">Your Stay</span>
          </div>
          <p className="text-sm text-gray-600">
            Check-in: {formatDate(checkIn)}
          </p>
          <p className="text-sm text-gray-600">
            Check-out: {formatDate(checkOut)}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">About the Property</h3>
          <p className="text-gray-600">{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;