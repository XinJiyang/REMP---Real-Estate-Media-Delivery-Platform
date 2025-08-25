import React, { useState } from 'react';
import { ListingCaseDetailResponseDto } from '../../interface/listing-case';

interface PropertyDetailsProps {
  listingCase: ListingCaseDetailResponseDto;
  onUpdate: (updatedData: Partial<ListingCaseDetailResponseDto>) => void;
  onSave?: () => Promise<any>;
}

const PropertyDetailsTab: React.FC<PropertyDetailsProps> = ({ listingCase, onUpdate, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let processedValue: any = value;
    if (['price', 'bedrooms', 'bathrooms', 'garages', 'floorArea', 'propertyType', 'saleCategory'].includes(name)) {
      processedValue = value === '' ? null : Number(value);
    }
    
    onUpdate({ [name]: processedValue });
  };

  const getPropertyTypeOptions = () => [
    { value: 1, label: 'House' },
    { value: 2, label: 'Townhouse' },
    { value: 3, label: 'Villa' },
    { value: 4, label: 'Apartment/Unit' },
    { value: 5, label: 'Others' }
  ];

  const getSaleCategoryOptions = () => [
    { value: 1, label: 'For Sale' },
    { value: 2, label: 'For Rent' },
    { value: 3, label: 'Auction' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (onSave) {
        await onSave();
      }
      
      setSuccess('Property details saved successfully!');
    } catch (err) {
      setError('Failed to save property details. Please try again.');
      console.error('Error updating listing case:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl w-full shadow-xl p-6">
      {error && (
        <div className="mt-3 bg-red-50 p-3 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mt-3 bg-green-50 p-3 rounded-md">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <div className="mb-6 mt-9">
            <label className="block text-xs text-gray-700 font-semibold mb-2">Property Title</label>
            <div>        
              <input 
                type="text" 
                name="title"
                value={listingCase.title || ''}
                onChange={handleInputChange}
                className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                required
              />    
            </div>
          </div>

          <div className='h-[1.5px] bg-[#F2F2F2]'></div>

          <div className="my-6">
            <label className="block text-xs text-gray-700 font-semibold mb-2">Sale Category</label>
            <select
              name="saleCategory"
              value={listingCase.saleCategory || ''}
              onChange={handleInputChange}
              className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
            >
              <option value="">Select Category</option>
              {getSaleCategoryOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='h-[1.5px] bg-[#F2F2F2]'></div>

          <div className="my-6">
            <label className="block text-xs text-gray-700 font-semibold mb-2">Property Type</label>
            <select
              name="propertyType"
              value={listingCase.propertyType || ''}
              onChange={handleInputChange}
              className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
            >
              <option value="">Select Type</option>
              {getPropertyTypeOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='h-[1.5px] bg-[#F2F2F2]'></div>

          <div className="my-6">
            <label className="block text-xs text-gray-700 font-semibold mb-2">Address</label>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Street</label>
                <input 
                  type="text" 
                  name="street"
                  value={listingCase.street || ''}
                  onChange={handleInputChange}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={listingCase.city || ''}
                    onChange={handleInputChange}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">State</label>
                  <input 
                    type="text" 
                    name="state"
                    value={listingCase.state || ''}
                    onChange={handleInputChange}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Postcode</label>
                  <input 
                    type="number" 
                    name="postcode"
                    value={listingCase.postcode || ''}
                    onChange={handleInputChange}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Price</label>
                  <input 
                    type="number" 
                    name="price"
                    value={listingCase.price || ''}
                    onChange={handleInputChange}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='h-[1.5px] bg-[#F2F2F2]'></div>
          <div className="my-6">
            <label className="block text-xs text-gray-700 font-semibold mb-2">Basic Information</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms"
                  value={listingCase.bedrooms || ''}
                  onChange={handleInputChange}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bathrooms</label>
                <input 
                  type="number" 
                  name="bathrooms"
                  value={listingCase.bathrooms || ''}
                  onChange={handleInputChange}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Garages</label>
                <input 
                  type="number" 
                  name="garages"
                  value={listingCase.garages || ''}
                  onChange={handleInputChange}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Floor Area (sqm)</label>
                <input 
                  type="number" 
                  name="floorArea"
                  value={listingCase.floorArea || ''}
                  onChange={handleInputChange}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyDetailsTab;