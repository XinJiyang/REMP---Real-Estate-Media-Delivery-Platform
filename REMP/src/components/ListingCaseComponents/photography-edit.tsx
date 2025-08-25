import React, { useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { ImageType, QuiltedImageItem } from "../../interface/media-asset";
import EditButton from '../edit-button';
import SelectMediaPopup from '../EditPopupComponents/select-media-popup';

interface PhotographyEditProps {
  images: ImageType[];
}

const PhotographyEdit: React.FC<PhotographyEditProps> = ({ images }) => {
  const [isSelectMediaOpen, setIsSelectMediaOpen] = useState(false);
  
  const getImageLayout = (index: number) => {
    if (index === 0 || index === 5) {
      return { rows: 2, cols: 2 };
     
    } else {
      return { rows: 1, cols: 1 };
    }
  };

  const quiltedImages: QuiltedImageItem[] = images.map((image, index) => {
    const { rows, cols } = getImageLayout(index);
    
    return {
      ...image,
      rows,
      cols
    };
  });

  const handleSelectMediaClose = () => {
    setIsSelectMediaOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Photography
      </h1>
      
      <div className="max-w-6xl px-4 mx-auto">
        <ImageList
          variant="quilted"
          cols={5}
          rowHeight={130}
          gap={12}
          sx={{ 
            width: '100%', 
            margin: 0,
            overflow: 'hidden',
          }}
        >
          {quiltedImages.map((item, index) => (
            <ImageListItem 
              key={index} 
              cols={item.cols} 
              rows={item.rows}
              sx={{ 
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  zIndex: 1,
                },
              }}
            >
              <img
                src={item.src}
                alt={item.alt || `Gallery image ${index + 1}`}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div >
            <EditButton text={"Select display images"} onClick={() => setIsSelectMediaOpen(true)}/>
          </div>
          <p className="text-[#E4E4E4]">Select the images you want to display here</p>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
      </div>

      <SelectMediaPopup 
        isOpen={isSelectMediaOpen} 
        onClose={handleSelectMediaClose} 
      />
    </div>
  );
};

export default PhotographyEdit;