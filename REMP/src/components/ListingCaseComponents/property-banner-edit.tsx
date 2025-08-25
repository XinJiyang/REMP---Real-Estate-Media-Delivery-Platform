import { useState } from "react";
import { Property } from "../../interface/listing-case";
import EditButton from "../edit-button";
import HeroMediaPopup from "../EditPopupComponents/hero-media-popup";
import PropertyDetailPopup from "../EditPopupComponents/property-detail-popup";

interface PropertyBannerProps{
  property: Property
}

const PropertyBannerEdit: React.FC<PropertyBannerProps> = ({property}) => {
  const [isHeroMediaOpen, setIsHeroMediaOpen] = useState(false);
  const [isPropertyDetailOpen, setIsPropertyDetailOpen] = useState(false);

  const handleHeroMediaClose = () => {
    setIsHeroMediaOpen(false);
  };

  const handlePropertyDetailClose = () => {
    setIsPropertyDetailOpen(false);
  };

  return(
    <>
      <div className="flex flex-row gap-1.5">
        <div className="relative w-7/12">
          <img 
            src="/images/image.png"
          />
          <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div>
                <EditButton onClick={() => setIsHeroMediaOpen(true)}/>
              </div>
              <p className="text-[#E4E4E4]">Select a cover media to be displayed on the first page</p>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
          </div>
        </div>
        
        <div className="relative bg-[#230A02] flex-grow flex flex-col items-center justify-center">
          <div className="text-white font-thin bg-[#36231c] rounded-md py-1 px-3">
            Apartment for {property.propertyType}
          </div>
          <div className="font-abhaya font-medium text-white text-4xl mt-10">
            {property.street}
          </div>
          <div className="text-white flex flex-row font-light mt-3">
            {property.city}, {property.state}, {property.postcode}
          </div>
          <div className="text-7xl  text-white">
            {property.price??"_"}
          </div>
          <div className="mt-16 text-white flex flex-row gap-10 ">
            <div className="flex flex-col items-center gap-2">
              <img className="w-[30px]" src="/images/bed-icon.svg" />
              <span>{property.bedroom} Beds</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img className="w-[30px]" src="/images/bath-icon.svg"/>
              <span>{property.bathroom} Baths</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img className="w-[30px]" src="/images/garage-icon.svg"/>
              <span>{property.gargage} Garages</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img className="w-[30px]" src="/images/plan-icon.svg"/>
              <span>{property.floorPlan} m²</span>
            </div>
          </div>
          <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
            <div className="flex flex-col gap-3 justify-center items-center">
              <div >
                <EditButton onClick={() => setIsPropertyDetailOpen(true)}/>
              </div>
              <p className="text-[#E4E4E4]">Add property details</p>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
          </div>
        </div>
      </div>
      
      <HeroMediaPopup 
        isOpen={isHeroMediaOpen} 
        onClose={handleHeroMediaClose} 
      />
      
      <PropertyDetailPopup 
        isOpen={isPropertyDetailOpen} 
        onClose={handlePropertyDetailClose} 
      />
    </>
  );
}

export default PropertyBannerEdit;