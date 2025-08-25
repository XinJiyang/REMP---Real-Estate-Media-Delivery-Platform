import React, { useState } from 'react';
import { MediaAssetDto } from '../../interface/listing-case';
import { Upload, X } from 'lucide-react';
import { formatFileSize } from '../../utils/format-size';

interface VRTourTabProps {
  vrTour: MediaAssetDto | null;
  onUpload: (file: File) => Promise<void>;
}

const VRTourTab: React.FC<VRTourTabProps> = ({ vrTour, onUpload }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      await onUpload(selectedFile);
      setIsUploadModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading VR tour:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-6">
        <button 
          className="bg-[#0085CA] text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload VR Tour
        </button>
      </div>

      {vrTour?.mediaUrl ? (
        <div className="flex justify-center mb-4">
          <div className="w-full h-[70vh] max-w-4xl rounded-lg overflow-hidden shadow-md">
            <iframe 
              src={vrTour.mediaUrl} 
              title="VR Tour" 
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No VR tour uploaded yet</p>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload VR Tour</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-center mb-4">Drop your VR tour file here to upload</p>
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                <span className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </span>
                <input 
                  type="file" 
                  accept=".vr,.glb,.gltf,.fbx,.vrm,.obj,.babylon" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {selectedFile && (
              <div className="mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
                  <div className="flex items-center">
                    <span className="text-sm truncate max-w-md">{selectedFile.name}</span>
                  </div>
                  <button 
                    className="bg-red-500 text-white rounded-full p-1"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                 <div className="mt-1 w-full">
                    <p className="text-xs text-gray-800 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
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
                disabled={!selectedFile || isUploading}
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

export default VRTourTab;