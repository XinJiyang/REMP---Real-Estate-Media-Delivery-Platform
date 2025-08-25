import React, { useState } from 'react';
import { ListingCaseDetailResponseDto, MediaAssetDto } from '../../interface/listing-case';
import { Download, Trash2, Upload, X, Play } from 'lucide-react';
import { formatFileSize } from '../../utils/format-size';
import { useToast } from '../../hooks/use-toast';
import mediaAssetApi from '../../apis/mediaAssetsAPIs';
import { useMedia } from '../../hooks/useMedia';

interface VideographyTabProps {
  video: MediaAssetDto | null;
  setListingCase: React.Dispatch<React.SetStateAction<ListingCaseDetailResponseDto | null>>;
  onUpload: (file: File) => Promise<void>;
}

const VideographyTab: React.FC<VideographyTabProps> = ({ 
  video, 
  setListingCase, 
  onUpload 
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  const { downloadMedia } = useMedia();
  const videoRef = React.useRef<HTMLVideoElement>(null);

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
      console.error('Error uploading video:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!video) return;
    
    try {
      const res = await mediaAssetApi.deleteMedia(video.id);

      if (res.status === 200) {
        toast({
          description: "Video deleted successfully",
        });
        setListingCase(prev => {
          if (!prev) return null;
          return {
            ...prev,
            mediaAssets: {
              ...prev.mediaAssets,
              video: []
            }
          };
        });
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete video",
        });
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast({
        variant: "destructive",
        description: "Failed to delete video",
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      }
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
          Upload Video
        </button>
      </div>

      {video ? (
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-3xl relative group">
            <video 
              ref={videoRef}
              src={video.mediaUrl || ''} 
              controls
              className="w-full rounded-lg shadow-md"
              poster={video.mediaUrl ? undefined : ''}
            >
              Your browser doesn't support video playback.
            </video>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 z-10"
                onClick={() => downloadMedia(video)}
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 z-10"
                onClick={handleDelete}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No video uploaded yet</p>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upload Video</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 flex flex-col items-center justify-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-center mb-4">Drop your video file here to upload</p>
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                <span className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </span>
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {selectedFile && (
              <div className="mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
                  <div className="flex items-center">
                    <Play className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm truncate max-w-md">{selectedFile.name}</span>
                  </div>
                  <button 
                    className="bg-red-500 text-white rounded-full p-1"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div className="mt-2">
                  <video 
                    className="w-full rounded" 
                    controls 
                    src={URL.createObjectURL(selectedFile)}
                  />
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

export default VideographyTab;