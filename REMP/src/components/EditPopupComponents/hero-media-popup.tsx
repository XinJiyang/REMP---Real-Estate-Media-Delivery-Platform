import React, { useState } from 'react';
import {X } from 'lucide-react';
import { ImageType } from '../../interface/media-asset';

interface HeroMediaPopupProps {
  isOpen: boolean;
  onClose: () => void;
}



const images:ImageType[] = Array.from({length:22},(_,i) => ({
  id:i,
  src:"/images/photography.jpg",
  width:50,
  height:50
}));

const HeroMediaPopup: React.FC<HeroMediaPopupProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleSelectImage = (index:number) => {
    setSelectedImage(index);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Hero media</h2>
          <p className="text-xs">Please select ONE cover media to be displayed on the first page.</p>
        </div>
        {/* 分割线 */}
        <div className='h-[1.5px] bg-[#F2F2F2]'></div>

        <div className="mx-auto max-w-xl mt-9">
          <div className="max-h-96 overflow-y-auto pr-2 "
          style={{
            //hide scroll bar
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
          }}>
            <div className="grid grid-cols-5 gap-10">
              {images.map((image,index)=>(
                <div 
                  key={index} 
                  className={`relative w-20 h-20 cursor-pointer overflow-hidden rounded-lg
                    ${selectedImage === index ? 'bg-transparent' : ''}
                  `}
                  onClick={() => handleSelectImage(index)}
                >
                  <img 
                    src={image.src} 
                    alt={`Image ${index + 1}`}   
                    className="w-full h-full rounded-lg"
                  />

                  {selectedImage !== index &&(
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                  )}

                  {selectedImage === index ? (
                    <div className="absolute top-1.5 left-1.5 bg-[#65C360] rounded-sm p-0.5">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3 text-white" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  ):(
                    <div className="absolute top-1.5 left-1.5 bg-white rounded-sm p-0.5">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3 text-white" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                      
                      </svg>
                    </div>
                  )}
                </div>
              ))}
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
       
      </div>
    </div>
  );
};

export default HeroMediaPopup;