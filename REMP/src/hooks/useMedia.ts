import { useState } from "react";
import { MediaAssetDto } from "../interface/listing-case";
import { toast } from "./use-toast";
import mediaAssetApi from "../apis/mediaAssetsAPIs";

export const useMedia = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadMedia = async (photo: MediaAssetDto) => {
    setIsDownloading(true);
    
    try {
      toast({
        description: "Starting download...",
      });
      
      const response = await mediaAssetApi.downloadMedia(photo.id);
      
      const contentType = response.headers['content-type'];
      let fileName = `media_${photo.id}`;
      
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, '');
        }
      }
      
      if (!fileName.includes('.')) {
        if (contentType === 'image/jpeg') fileName += '.jpg';
        else if (contentType === 'image/png') fileName += '.png';
        else if (contentType === 'image/gif') fileName += '.gif';
        else if (contentType === 'video/mp4') fileName += '.mp4';
      }
      
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        description: "Media downloaded successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        description: "Media download failed",
      });
      
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadMedia, isDownloading };
};