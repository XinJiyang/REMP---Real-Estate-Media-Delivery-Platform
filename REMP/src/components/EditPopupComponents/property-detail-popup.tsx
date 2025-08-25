import React, { useState } from 'react';
import { X} from 'lucide-react';
import SquareRadio from './square-radio';
import Counter from './counter';

interface PropertyDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsPopup: React.FC<PropertyDetailsProps> = ({ isOpen, onClose }) => {
  // State for form values
  const [propertyStatus, setPropertyStatus] = useState<string>('For Sale');
  const [propertyType, setPropertyType] = useState<string>('Apartment/Unit');
  const [bedCount, setBedCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(3);
  const [carCount, setCarCount] = useState<number>(3);
  const [area, setArea] = useState<number>(0);

  if (!isOpen) return null;

  const statusOptions = ['For Sale', 'Auction', 'For Rent'];
  
  const typeOptions = ['House', 'Townhouse', 'Villa', 'Apartment / Unit', 'Others'];

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Property details</h2>
          <p className="text-xs">Please take a moment to review and complete property details.</p>
        </div>

        {/* 分割线 */}
        <div className='h-[1.5px] bg-[#F2F2F2]'></div>
        <form>
          <div className='max-h-96 overflow-y-auto'
           style={{
            //hide scroll bar
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
          }}>
            {/* Property Address */}
            <div className="mb-6 mt-9">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Property Address</label>
              <div>        
                <input 
                  type="text" 
                  className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                />    
              </div>
            </div>

            {/* 分割线 */}
            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            {/* Property Status */}
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

            {/* 分割线 */}
            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            {/* Property Type */}
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

            {/* 分割线 */}
            <div className='h-[1.5px] bg-[#F2F2F2]'></div>
            {/* Basic Information */}
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
              className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetailsPopup;