import { Property } from "../../interface/listing-case";

interface LocationDisplayEditProps{
  property:Property;
}

const LocationDisplayEdit:React.FC<LocationDisplayEditProps> = ({property}) =>{
  return(
    <div className="relative flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Location
      </h1>
      <iframe 
        src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&output=embed`}
        width="75%" 
        height="270"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      {/* 半透明层 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
      </div>
    </div>
  )
}

export default LocationDisplayEdit;