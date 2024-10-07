import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'
import PropertyInfo from './PropertyInfo'
import ChatWindow from './ChatWindow'

const GuestApp: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>()
  const [activeTab, setActiveTab] = useState<'info' | 'chat'>('info')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const guestName = queryParams.get('name') || 'Guest'
  const checkIn = queryParams.get('checkIn') || ''
  const checkOut = queryParams.get('checkOut') || ''

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'info' ? (
          <PropertyInfo
            propertyId={propertyId || ''}
            guestName={guestName}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        ) : (
          <ChatWindow propertyId={propertyId || ''} />
        )}
      </main>
      <nav className="bg-white border-t border-gray-200">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex flex-col items-center p-4 ${
              activeTab === 'info' ? 'text-[#FF5A5F]' : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center p-4 ${
              activeTab === 'chat' ? 'text-[#FF5A5F]' : 'text-gray-500'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Chat</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default GuestApp