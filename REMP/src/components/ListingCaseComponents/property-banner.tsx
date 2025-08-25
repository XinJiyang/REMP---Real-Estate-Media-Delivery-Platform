import React from "react";
import { Property } from "../../interface/listing-case";

interface PropertyBannerProps {
  property: Property;
  heroImage?: string;
}

const PropertyBanner: React.FC<PropertyBannerProps> = ({ property, heroImage = "/images/image.png" }) => {
  return(
    <>
      <div className="flex flex-row">
        <img 
          className="w-7/12 h-[72vh] object-cover" 
          src={heroImage}
        />
        <div className="bg-[#230A02] flex-grow flex flex-col items-center justify-center">
          
          <div className="text-white font-thin bg-[#36231c] rounded-md py-1 px-3">
            Apartment for {property.propertyType}
          </div>
          <div className="font-abhaya font-medium text-white text-4xl mt-10">
            {property.street}
          </div>
          <div className="text-white flex flex-row font-light mt-3">
            {property.city}, {property.state}, {property.postcode}
          </div>
          <div className="text-5xl text-white mt-8">
            {property.price ? `$${property.price.toLocaleString()}` : "_"}
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
        </div>
      </div>
    </>
  );
}

export default PropertyBanner;