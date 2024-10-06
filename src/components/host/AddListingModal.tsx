import React, { useState, useRef } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { Property } from './HostDashboard';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: Omit<Property, 'id'>) => void;
}

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onAddListing }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [listingRules, setListingRules] = useState('');
  const [entranceInstructions, setEntranceInstructions] = useState('');
  const [location, setLocation] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleAddListing = () => {
    if (name && imageFile) {
      onAddListing({
        name,
        description,
        imageUrl: previewUrl || '',
        features,
        listingRules,
        entranceInstructions,
        location
      });
      onClose();
      // Reset form
      setName('');
      setDescription('');
      setImageFile(null);
      setPreviewUrl(null);
      setFeatures([]);
      setListingRules('');
      setEntranceInstructions('');
      setLocation('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Listing Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border rounded h-24"
          />
          <div 
            onClick={triggerFileInput}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-cover" />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-gray-400" size={24} />
                <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <div className="space-y-2">
              {['AI Chat', 'AI Calls (Coming Soon)', 'Recommended Places to Eat', 'Location Guide'].map((feature) => (
                <label key={feature} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                    className="form-checkbox"
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Listing Rules</h3>
            <textarea
              value={listingRules}
              onChange={(e) => setListingRules(e.target.value)}
              placeholder="Enter listing rules here"
              className="w-full p-2 border rounded h-24"
            />
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Entrance Instructions</h3>
            <textarea
              value={entranceInstructions}
              onChange={(e) => setEntranceInstructions(e.target.value)}
              placeholder="Enter entrance instructions here"
              className="w-full p-2 border rounded h-24"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleAddListing}
            disabled={!name || !imageFile}
            className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              name && imageFile
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="mr-2" size={20} />
            Add Listing
          </button>
        </div>
        <button onClick={onClose} className="mt-4 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddListingModal;