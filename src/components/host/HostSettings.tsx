import React from 'react'
import { User, Mail, Lock } from 'lucide-react'

const HostSettings: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Host Settings</h2>
      <form className="space-y-6 max-w-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF5A5F] focus:ring focus:ring-[#FF5A5F] focus:ring-opacity-50"
            />
            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF5A5F] focus:ring focus:ring-[#FF5A5F] focus:ring-opacity-50"
            />
            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF5A5F] focus:ring focus:ring-[#FF5A5F] focus:ring-opacity-50"
            />
            <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF7E82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default HostSettings