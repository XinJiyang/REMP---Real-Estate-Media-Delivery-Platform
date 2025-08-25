import React, { useState } from 'react';
import { ListingCaseDetailResponseDto, MediaAssetDto } from '../../interface/listing-case';
import { Download, Trash2, Upload, X } from 'lucide-react';
import { formatFileSize } from '../../utils/format-size';
import ImagePreview from '../image-preview';
import { useToast } from '../../hooks/use-toast';
import mediaAssetApi from '../../apis/mediaAssetsAPIs';
import { useMedia } from '../../hooks/useMedia';

interface PhotographyTabProps {
  photos: MediaAssetDto[];
  setListingCase : React.Dispatch<React.SetStateAction<ListingCaseDetailResponseDto | null>>
  onUpload: (files: File[]) => Promise<void>;
}

const PhotographyTab: React.FC<PhotographyTabProps> = (
  { 
    photos,  
    setListingCase, 
    onUpload 
  }
) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaAssetDto | null>(null);
  const { toast } = useToast();
  const { downloadMedia } = useMedia();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles((pre) => [...pre, ...Array.from(files)]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setSelectedFiles((pre) => [...pre, ...Array.from(files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    try {
      await onUpload(selectedFiles);
      setIsUploadModalOpen(false);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

 
  const handleDelete = async (photo: MediaAssetDto) => {
    
    try{
      var res = await mediaAssetApi.deleteMedia(photo.id);

      if(res.status === 200 ){
        toast({
          description: "Photo assets deleted successfully",
        })
        setListingCase(prev => {
          if (!prev) return null;
          return {
            ...prev,
            mediaAssets:{
              ...prev.mediaAssets,
              picture: prev.mediaAssets.picture.filter(pic => pic.id !== photo.id)
            }
          };
        });
      }else{
        toast({
          variant: "destructive",
          description: "Photo assets deleted failed",
        })
      }
    }catch (error) {
      console.error("Error deleting photo:", error);
      toast({
        variant: "destructive",
        description: "Photo assets deleted failed",
      })
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const openPreview = (photo: MediaAssetDto) => {
    setSelectedImage(photo);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-6">
        <button 
          className="bg-[#0085CA] text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Photos
        </button>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group"
            >
              <img 
                src={photo.mediaUrl || ''} 
                alt="Property" 
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => openPreview(photo)}
              />
              <button 
                className="absolute top-0 left-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 z-10"
                onClick={() => downloadMedia(photo)}
              >
                <Download className="w-3 h-3" />
              </button>

              <button 
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 z-10"
                onClick={() => handleDelete(photo)}
              >
                <Trash2 className="w-3 h-3" />
              </button>

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.isHero && (
                    <span className="bg-amber-500 text-white px-2 py-1 rounded text-xs">Hero Image</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No photos uploaded yet</p>
        </div>
      )}

      {selectedImage && (
        <ImagePreview 
          closePreview={closePreview}
          selectedImage={selectedImage}
        />
      )}

      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Photography</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-center mb-4">Drop your images here to upload</p>
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                <span className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{selectedFiles.length} images selected</p>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={file.name} 
                        className="w-24 h-24 object-cover rounded"
                      />
                      
                      <button 
                        className="absolute -top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                        onClick={() => removeSelectedFile(index)}
                      >
                         <X className="w-3 h-3" />
                      </button>
                      <div className="mt-1 w-full">
                        <p className="text-xs text-gray-800 truncate" title={file.name}>{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-[#0085CA] text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyTab;