import React, { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatWindowProps {
  propertyId: string | undefined
}

const ChatWindow: React.FC<ChatWindowProps> = ({ propertyId }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }])
      // Simulate AI response (replace with actual AI integration later)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `AI response for property ${propertyId}`, isUser: false },
        ])
      }, 1000)
      setInputText('')
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.isUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-800'
            } rounded-lg p-2 max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-r-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow