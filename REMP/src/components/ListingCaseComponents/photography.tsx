import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { ImageType, QuiltedImageItem } from "../../interface/media-asset";

interface PhotographyProps {
  images: ImageType[];
}

const Photography: React.FC<PhotographyProps> = ({ images }) => {
  
  const getImageLayout = (index: number) => {
    // if (index === 0 || index === 5 || index ===9 || index ===14) {
    //   return { rows: 2, cols: 2 };
     
    // } else {
      return { rows: 1, cols: 1 };
    //}
  };

  const quiltedImages: QuiltedImageItem[] = images.map((image, index) => {
    const { rows, cols } = getImageLayout(index);
    
    return {
      ...image,
      rows,
      cols
    };
  });

  return (
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Photography
      </h1>
      
      {images.length > 0 ? (
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
      ) : (
        <>
          <p className="text-[#6F809E]">No photography available</p>
          <button className="underline text-[#324361] font-bold">Click to add</button>
        </>
      )}
    </div>
  );
};

export default Photography;