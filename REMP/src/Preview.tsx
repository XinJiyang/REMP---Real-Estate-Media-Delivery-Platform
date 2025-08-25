import React from 'react'
import { Property } from './interface/listing-case'
import PropertyBanner from './components/ListingCaseComponents/property-banner'
import Photography from './components/ListingCaseComponents/photography'
import { ImageType } from './interface/media-asset'
import FloorPlan from './components/ListingCaseComponents/floor-plan'
import Videography from './components/ListingCaseComponents/videography'
import LocationDisplay from './components/ListingCaseComponents/location'
import Navbar from './components/nav-bar'
import PropertyDescriptionPreview from './components/ListingCaseComponents/property-description-preview'
import { Agent } from './interface/agent'

const property: Property = { 
  id: 1, 
  title:"test",
  propertyType:'Rent',
  description: "For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. ",
  longitude:151.20143101108647,
  latitude:-33.82905224860337,
  street: '93 Beach Road', 
  city: 'North Bondi',
  state: 'NSW',
  postcode: 2026,
  bedroom: 2, 
  bathroom: 2, 
  gargage: 2, 
  floorPlan: 2 
}

const agents: Agent[] = [
  { id: 1, name: "John Doe", company: "Acme Corp", agentImage: "/images/agent-image.jpg" },
  { id: 2, name: "Jane Smith", company: "Globex Inc.", agentImage: "/images/agent-image.jpg" },
  { id: 3, name: "Jane Smith", company: "Globex Inc.", agentImage: "/images/agent-image.jpg" },
];

const navItem = [
  {
    text: "Exit",
    href: "/",
  },

  {
    text: "Publish",
    href: "/edit",
  },
]

const images:ImageType[] = Array(9).fill({
  src:"/images/photography.jpg",
  width:50,
  height:90
})

const PropertyPreview: React.FC = () => {



  return (
    <>
      <Navbar showDownload={false} items={navItem}/>
      <PropertyBanner  property={property}/>

      <PropertyDescriptionPreview description={property.description} agents={agents}/>

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>
      
      <Photography images={images}/>

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      {/* <FloorPlan /> */}

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      {/* <Videography /> */}

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      <LocationDisplay property={property} />

   
      
    </>
  )
}

export default PropertyPreview