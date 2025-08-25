import React from 'react'
import { Property } from './interface/listing-case'
import { ImageType } from './interface/media-asset'
import PropertyBannerEdit from './components/ListingCaseComponents/property-banner-edit'
import PropertyDescriptionEdit from './components/ListingCaseComponents/property-description-edit'
import PhotographyEdit from './components/ListingCaseComponents/photography-edit'
import FloorPlanEdit from './components/ListingCaseComponents/floor-plan-edit'
import VideographyEdit from './components/ListingCaseComponents/videography-edit'
import LocationDisplayEdit from './components/ListingCaseComponents/location-edit'
import ContactEdit from './components/ListingCaseComponents/contact-edit'
import Navbar from './components/nav-bar'

const property: Property = { 
  id: 1, 
  title:"test",
  propertyType:'Rent',
  description:"For writers, a random sentence can help them get their creative juices flowing. Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears. There are a number of different ways a writer can use the random sentence for creativity. The most common way to use the sentence is to begin a story. ",
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

const images:ImageType[] = Array(9).fill({
  src:"/images/photography.jpg",
  width:50,
  height:90
})
  

const navItem = [
  {
    text: "Exit",
    href: "/",
  },
  
  {
    text: "Preview",
    href: "/preview",
  },
]

const Home: React.FC = () => {



  return (
    <>
      <Navbar items={navItem}/>
      <PropertyBannerEdit  property={property}/>

      {/**分割线 */}
      <div className="h-1.5 bg-[#f3f3f3]"></div>

      <PropertyDescriptionEdit />

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>
      
      <PhotographyEdit images={images}/>

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      <FloorPlanEdit />

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      <VideographyEdit />

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>

      <LocationDisplayEdit property={property} />

      {/**分割线 */}
      <div className="h-2 bg-[#f3f3f3]"></div>
      
      <ContactEdit />
      
    </>
  )
}

export default Home