import React, { useState } from 'react';
import { scrapeAirbnbListing } from '../../utils/airbnbScraper';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: { name: string; location: string; imageUrl: string }) => void;
}

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onAddListing }) => {
  const [step, setStep] = useState(1);
  const [listingUrl, setListingUrl] = useState('');
  const [listingData, setListingData] = useState<{ title: string; description: string; imageUrl: string; location: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrapeListing = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const scrapedData = await scrapeAirbnbListing(listingUrl);
      if (!scrapedData.title || !scrapedData.location || !scrapedData.imageUrl) {
        throw new Error('Failed to extract all required data from the listing');
      }
      setListingData(scrapedData);
      setStep(2);
    } catch (error) {
      console.error('Error scraping listing:', error);
      setError(error instanceof Error ? error.message : 'Failed to scrape listing. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddListing = () => {
    if (listingData) {
      onAddListing({
        name: listingData.title,
        location: listingData.location,
        imageUrl: listingData.imageUrl,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
        {step === 1 && (
          <div>
            <input
              type="text"
              value={listingUrl}
              onChange={(e) => setListingUrl(e.target.value)}
              placeholder="Enter Airbnb listing URL"
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleScrapeListing}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isLoading ? 'Scraping...' : 'Scrape Listing'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
        {step === 2 && listingData && (
          <div>
            <img src={listingData.imageUrl} alt={listingData.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">{listingData.title}</h3>
            <p className="text-gray-600 mb-4">{listingData.location}</p>
            <button
              onClick={handleAddListing}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Listing
            </button>
          </div>
        )}
        <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddListingModal;