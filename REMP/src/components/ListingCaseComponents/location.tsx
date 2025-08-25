import React, { useState } from "react"
import { Property } from "../../interface/listing-case"
import { MapPin } from "lucide-react"
import listingApi from "../../apis/listingcaseAPIs"
import LocationPopup from "../EditPopupComponents/location-popup"

interface LocationDisplayProps {
  property: Property
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ property }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [locationData, setLocationData] = useState({
    latitude: property.latitude,
    longitude: property.longitude
  })

  const handleSaveLocation = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true)
      
      await listingApi.updateListingCase(property.id, {
        latitude,
        longitude
      })
      
      setLocationData({ latitude, longitude })
    } catch (error) {
      console.error("Failed to update location:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Location
      </h1>
      {locationData.latitude !== null && locationData.longitude !== null ? (
        <div className="w-full flex flex-col items-center">
          <iframe 
            src={`https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}&output=embed`}
            width="75%" 
            height="270"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
          <button 
            className="mt-4 flex items-center gap-1 text-[#324361] underline font-medium"
            onClick={() => setIsPopupOpen(true)}
          >
            
            Edit Location
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#6F809E]">No location data available</p>
          <button 
            className="underline text-[#324361] font-bold flex items-center gap-1"
            onClick={() => setIsPopupOpen(true)}
          >
           
            Click to add
          </button>
        </div>
      )}

      <LocationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialLatitude={locationData.latitude}
        initialLongitude={locationData.longitude}
        onSave={handleSaveLocation}
        isLoading={isLoading}
      />
    </div>
  )
}

export default LocationDisplay