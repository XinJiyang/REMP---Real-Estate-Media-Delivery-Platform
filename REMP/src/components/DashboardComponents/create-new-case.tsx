import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Counter from '../EditPopupComponents/counter';
import SquareRadio from '../EditPopupComponents/square-radio';
import { useNavigate } from 'react-router-dom';
import cookieService from '../../config/cookie';
import { ListingCaseCreateRequest, PropertyType, SaleCategory } from '../../interface/listing-case';
import listingApi from '../../apis/listingcaseAPIs';
import { Place } from '../../interface/place';
import GooglePlacesAutocomplete from '../address-auto-complete';

interface PropertyDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateListingCase: React.FC<PropertyDetailsProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [propertyStatus, setPropertyStatus] = useState<string>('For Sale');
  const [propertyType, setPropertyType] = useState<string>('Apartment/Unit');
  const [bedCount, setBedCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [carCount, setCarCount] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postcode, setPostcode] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number| undefined>(undefined);
  const [latitude, setLatitude] = useState<number| undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [place, setPlace] = useState<Place | null>(null);
  const navigate = useNavigate();
  
  const handlePlaceSelect = (place: Place) => {
    setStreet(place.streetNumber + ' ' + place.streetName || '' )
    setPlace(place);
    setState(place.administrativeArea || '');
    setCity(place.locality || '');
    setPostcode(place.postalCode ? parseInt(place.postalCode, 10) : undefined);
    setLatitude(place.location?.lat)
    setLongitude(place.location?.lng);
  };
  
  useEffect(() => {
    const token = cookieService.getToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const mapPropertyTypeToEnum = (type: string): PropertyType => {
    switch(type.toLowerCase().replace(/\s+/g, '')) {
      case 'house': return PropertyType.House;
      case 'townhouse': return PropertyType.Townhouse;
      case 'villa': return PropertyType.Villa;
      case 'apartment/unit': return PropertyType.ApartmentUnit;
      default: return PropertyType.Others;
    }
  };

  const mapSaleCategoryToEnum = (status: string): SaleCategory => {
    switch(status.toLowerCase().replace(/\s+/g, '')) {
      case 'forsale': return SaleCategory.ForSale;
      case 'forrent': return SaleCategory.ForRent;
      case 'auction': return SaleCategory.Auction;
      default: return SaleCategory.ForSale;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const token = cookieService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const requestData: ListingCaseCreateRequest = {
        title,
        propertyType: mapPropertyTypeToEnum(propertyType),
        saleCategory: mapSaleCategoryToEnum(propertyStatus),
        street,
        city,
        state,
        postcode,
        price,
        bedrooms: bedCount,
        bathrooms: bathCount,
        garages: carCount,
        floorArea: area,
        longitude,
        latitude,
      };
      
      await listingApi.createListingCase(requestData);
      onClose();
    } catch (error: any) {
      console.error('Error creating listing:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to create listing. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ['For Sale', 'Auction', 'For Rent'];
  const typeOptions = ['House', 'Townhouse', 'Villa', 'Apartment / Unit', 'Others'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Property details</h2>
          <p className="text-xs">Please take a moment to review and complete property details.</p>
        </div>

        <div className='h-[1.5px] bg-[#F2F2F2]'></div>
        {error && (
          <div className="mt-3 bg-red-50 p-3 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='max-h-96 overflow-y-auto'
           style={{
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
          }}>
            <div className="mb-6 mt-9">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Property Title</label>
              <div>        
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  required
                />    
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Property Status</label>
              <div className="flex gap-10">
                {statusOptions.map(status => (
                  <SquareRadio
                    key={status}
                    id={status.replace(/\s+/g, '').toLowerCase()}
                    name="propertyStatus"
                    value={status}
                    checked={propertyStatus === status}
                    onChange={() => setPropertyStatus(status)}
                    label={status}
                  />
                ))}
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Property Type</label>
              <div className="flex flex-wrap gap-10">
                {typeOptions.map(type => (
                  <SquareRadio
                    key={type}
                    id={type.replace(/\s+/g, '').toLowerCase()}
                    name="propertyType"
                    value={type}
                    checked={propertyType === type}
                    onChange={() => setPropertyType(type)}
                    label={type}
                  />
                ))}
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Search Address</label>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <GooglePlacesAutocomplete 
                    country="au"
                    value={street}
                    setStreet={setStreet}
                    onPlaceSelect={handlePlaceSelect}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Street</label>
                  <input 
                    type="text" 
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">City</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">State</label>
                    <input 
                      type="text" 
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Postcode</label>
                    <input 
                      type="number" 
                      value={postcode || ''}
                      onChange={(e) => setPostcode(e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Price</label>
                    <input 
                      type="number" 
                      value={price || ''}
                      onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>
            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Basic Information</label>
              <div className="flex flex-wrap gap-3">
                <Counter 
                  label="Bed" 
                  value={bedCount} 
                  onChange={setBedCount} 
                  iconSrc="/images/bed-icon.svg" 
                />
                
                <Counter 
                  label="Bath" 
                  value={bathCount} 
                  onChange={setBathCount} 
                  iconSrc="/images/bath-icon.svg" 
                />
                
                <Counter 
                  label="Car" 
                  value={carCount} 
                  onChange={setCarCount} 
                  iconSrc="/images/garage-icon.svg" 
                />

                <div className="flex bg-[#F5F5F5] rounded-md py-2 pl-2 pr-1 items-center">
                  <div className="p-2">
                    <img src={"/images/plan-icon.svg"} 
                      className="brightness-0 h-6 w-6" 
                    />
                  </div>
                  <span className="text-gray-700 text-sm mr-6">Area</span>
                  <div className="flex items-center bg-white rounded-sm h-7 border-[1px] border-[#E4E4E4] mr-2">
                    <input 
                      type="text" 
                      value={area} 
                      onChange={(e) => {
                        const value = Math.min(parseInt(e.target.value) || 0, 9999);
                        setArea(value);
                      }}
                      className="w-12 text-center text-sm border-0 bg-transparent focus:outline-none text-gray-700"
                    />
                  </div>
                  <span className="text-xs pr-2">m²</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="text-sm py-2 w-24 text-center border-2 border-black text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
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
    </div>
  );
};

export default CreateListingCase;
