import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Edit, Save, ExternalLink } from 'lucide-react'
import { Property } from './HostDashboard'

interface GuestLink {
  id: string
  guestName: string
  checkIn: string
  checkOut: string
}

interface PropertyDetailsProps {
  properties: Property[]
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ properties, setProperties }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [property, setProperty] = useState<Property | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showGenerateLink, setShowGenerateLink] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guestLinks, setGuestLinks] = useState<GuestLink[]>([])

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === Number(id))
    if (foundProperty) {
      setProperty(foundProperty)
    } else {
      navigate('/host')
    }
  }, [id, properties, navigate])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    if (property) {
      setProperties(prevProperties =>
        prevProperties.map(p => (p.id === property.id ? property : p))
      )
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (property) {
      setProperty({ ...property, [name]: value })
    }
  }

  const handleGenerateLink = () => {
    if (property) {
      const newLinkId = Date.now().toString()
      const guestLink = `${window.location.origin}/guest/${property.id}?name=${encodeURIComponent(guestName)}&checkIn=${checkInDate}&checkOut=${checkOutDate}`
      const newGuestLink: GuestLink = {
        id: newLinkId,
        guestName,
        checkIn: checkInDate,
        checkOut: checkOutDate
      }
      setGuestLinks([...guestLinks, newGuestLink])
      window.open(guestLink, '_blank')
      setShowGenerateLink(false)
      setGuestName('')
      setCheckInDate('')
      setCheckOutDate('')
    }
  }

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Property details */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={property.imageUrl} alt={property.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              property.name
            )}
          </h1>
          <p className="text-gray-600 mb-4">
            {isEditing ? (
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              property.description
            )}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside">
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Listing Rules</h2>
            <p>{property.listingRules}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Entrance Instructions</h2>
            <p>{property.entranceInstructions}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <p>{property.location}</p>
          </div>
        </div>
      </div>

      {/* Edit/Save button */}
      {isEditing ? (
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
        >
          <Save size={20} className="mr-2" />
          Save Changes
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <Edit size={20} className="mr-2" />
          Edit Property
        </button>
      )}

      {/* Generate Link section */}
      <div className="mt-6">
        {showGenerateLink ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Generate Guest Link</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Check-in Date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Check-out Date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleGenerateLink}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Generate Link
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowGenerateLink(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Generate New Link
          </button>
        )}
      </div>

      {/* Guest Links Table */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Generated Guest Links</h3>
        {guestLinks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Guest Name</th>
                  <th className="px-4 py-2 text-left text-gray-600">Check-in</th>
                  <th className="px-4 py-2 text-left text-gray-600">Check-out</th>
                  <th className="px-4 py-2 text-left text-gray-600">Link</th>
                </tr>
              </thead>
              <tbody>
                {guestLinks.map((link) => (
                  <tr key={link.id} className="border-t">
                    <td className="px-4 py-2">{link.guestName}</td>
                    <td className="px-4 py-2">{link.checkIn}</td>
                    <td className="px-4 py-2">{link.checkOut}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`${window.location.origin}/guest/${property.id}?name=${encodeURIComponent(link.guestName)}&checkIn=${link.checkIn}&checkOut=${link.checkOut}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        Open <ExternalLink size={16} className="ml-1" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No guest links generated yet.</p>
        )}
      </div>
    </div>
  )
}

export default PropertyDetails