import React from 'react';
import { ImageType } from "../../interface/media-asset";

interface FloorPlanProps {
  floorPlanImages: ImageType[];
}

const FloorPlan: React.FC<FloorPlanProps> = ({ floorPlanImages }) => {
  return(
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Floor Plan
      </h1>
      {floorPlanImages.length > 0 ? (
        <img 
          className="w-3/4"
          src={floorPlanImages[0].src} 
          alt="Floor Plan"
        />
      ) : (
        <>
          <p className="text-[#6F809E] mt-4">No floor plans available</p>
        </>
      )}
    </div>
  )
}

export default FloorPlan;