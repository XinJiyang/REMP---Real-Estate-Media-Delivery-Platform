import { MediaAssetDto } from "../interface/listing-case";

interface ImagePreviewProps{
  closePreview: () => void;
  selectedImage: MediaAssetDto;
}

const ImagePreview = ({
  closePreview,
  selectedImage
}:ImagePreviewProps) => {
  return(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={closePreview}
    >
      <div className="relative max-w-4xl max-h-screen p-4">
        <img 
          src={selectedImage.mediaUrl || ''} 
          alt="Preview" 
          className="max-w-full max-h-[90vh] object-contain"
        />
        <button 
          className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200"
          onClick={closePreview}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {selectedImage.isHero && (
          <span className="absolute bottom-8 left-8 bg-amber-500 text-white px-2 py-1 rounded text-xs">
            Hero Image
          </span>
        )}
      </div>
    </div>
  )
}

export default ImagePreview;