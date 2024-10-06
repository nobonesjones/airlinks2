import React, { useState } from 'react'
import { X, Upload, CheckCircle, Loader } from 'lucide-react'
import { scrapeAirbnbListing } from '../../utils/airbnbScraper'

interface AddListingModalProps {
  isOpen: boolean
  onClose: () => void
  onAddListing: (listing: { name: string; location: string; imageUrl: string }) => void
}

interface ListingData {
  title: string
  description: string
  imageUrl: string
  location: string
}

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onAddListing }) => {
  const [step, setStep] = useState(1)
  const [listingUrl, setListingUrl] = useState('')
  const [listingData, setListingData] = useState<ListingData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [welcomeGuide, setWelcomeGuide] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleScrapeListing = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const scrapedData = await scrapeAirbnbListing(listingUrl)
      setListingData(scrapedData)
      setStep(2)
    } catch (error) {
      console.error('Error scraping listing:', error)
      setError('Failed to scrape listing. Please check the URL and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    )
  }

  const handleSubmit = () => {
    if (listingData) {
      onAddListing({
        name: listingData.title,
        location: listingData.location,
        imageUrl: listingData.imageUrl
      })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Add New Listing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Add Listing URL</h3>
              <input
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="Enter Airbnb listing URL"
                className="w-full p-2 border rounded mb-4"
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                onClick={handleScrapeListing}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isLoading ? <Loader className="animate-spin" /> : 'Scrape Listing'}
              </button>
            </div>
          )}

          {step === 2 && listingData && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 2: Select Features</h3>
              <div className="mb-4">
                <h4 className="font-semibold">Scraped Listing Details:</h4>
                <p>Title: {listingData.title}</p>
                <p>Location: {listingData.location}</p>
                <img src={listingData.imageUrl} alt={listingData.title} className="w-full h-48 object-cover rounded mt-2" />
              </div>
              <div className="space-y-2">
                {['AI Guest Support', 'Recommended Eateries', 'Entry Instructions', 'Local Guide'].map(feature => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-2"
                    />
                    {feature}
                  </label>
                ))}
              </div>
              <button
                onClick={() => setStep(3)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 3: Upload Welcome Guide</h3>
              <textarea
                value={welcomeGuide}
                onChange={(e) => setWelcomeGuide(e.target.value)}
                placeholder="Enter your welcome guide here..."
                className="w-full p-2 border rounded mb-4 h-40"
              />
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddListingModal