import React from 'react';
import { MediaAssetDto } from "../../interface/listing-case";

interface VideographyProps {
  videos: MediaAssetDto[];
}

const Videography: React.FC<VideographyProps> = ({ videos }) => {
  return (
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Videography
      </h1>
      {videos.length > 0 && videos[0].mediaUrl ? (
        <div className="w-[55%]">
          <video 
            controls 
            className="w-full"
            src={videos[0].mediaUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <>
          <p className="text-[#6F809E] mt-4">No videos available</p>
        </>
      )}
    </div>
  )
}

export default Videography;