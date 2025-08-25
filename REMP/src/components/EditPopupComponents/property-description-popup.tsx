import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface PropertyDescriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialDescription?: string | null;
  onSave?: (description: string) => void;
  isLoading?: boolean;
}

const PropertyDescriptionPopup: React.FC<PropertyDescriptionPopupProps> = ({ 
  isOpen, 
  onClose, 
  initialDescription = '',
  onSave,
  isLoading = false
}) => {
  const [description, setDescription] = useState<string>('');
  
  useEffect(() => {
    if (initialDescription) {
      setDescription(initialDescription);
    }
  }, [initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(description);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button 
            onClick={onClose} 
            className="ml-auto text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Property Description</h2>
          <p className="text-xs">Please describe the key features and highlights of the property.</p>
        </div>

        <div className='h-[1.5px] bg-[#F2F2F2]'></div>
        
        <form onSubmit={handleSubmit}>
          <div className='max-h-96 overflow-y-auto'
           style={{
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
          }}>
            <div className="my-6">
              <textarea 
                className="w-full h-64 p-4 bg-[#F3F3F3] rounded-md text-gray-700 focus:outline-none resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="text-sm py-2 w-24 text-center border-2 border-black text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyDescriptionPopup;