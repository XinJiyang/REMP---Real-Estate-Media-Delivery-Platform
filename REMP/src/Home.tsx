import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyBanner from './components/ListingCaseComponents/property-banner'
import Photography from './components/ListingCaseComponents/photography'
import PropertyDescription from './components/ListingCaseComponents/property-description'
import FloorPlan from './components/ListingCaseComponents/floor-plan'
import Videography from './components/ListingCaseComponents/videography'
import LocationDisplay from './components/ListingCaseComponents/location'
import Contact from './components/ListingCaseComponents/contact'
import Navbar from './components/nav-bar'
import { PencilLine } from 'lucide-react'
import { ListingCaseDetailResponseDto, MediaAssetDto, Property } from './interface/listing-case'
import { ImageType } from './interface/media-asset'
import listingApi from './apis/listingcaseAPIs'

const navItem = [
  
  {
    text: "Edit",
    href: "/edit",
    icon: <PencilLine className="h-4 w-4 text-black" />
  },
  {
    text: "Publish",
    href: "/edit",
  },
]

const PropertyHome: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [listingCase, setListingCase] = useState<ListingCaseDetailResponseDto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListingCase = async () => {
      if (!id) return
      
      try {
        const response = await listingApi.getListingById(parseInt(id))
        setListingCase(response.data)
      } catch (error) {
        console.error('Failed to fetch listing case:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListingCase()
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!listingCase) {
    return <div className="flex justify-center items-center h-screen">Listing not found</div>
  }

  const mapMediaAssetsToImages = (assets: MediaAssetDto[]): ImageType[] => {
    return assets.map(asset => ({
      src: asset.mediaUrl || "/images/placeholder.jpg",
      width: 50,
      height: 90
    }))
  }

  const propertyData:Property = {
    id: listingCase.id,
    title: listingCase.title,
    propertyType: getSaleCategoryName(listingCase.saleCategory),
    description: listingCase.description || "",
    longitude: listingCase.longitude || null,
    latitude: listingCase.latitude || null,
    street: listingCase.street || "",
    city: listingCase.city || "",
    state: listingCase.state || "",
    postcode: listingCase.postcode || 0,
    bedroom: listingCase.bedrooms || 0,
    bathroom: listingCase.bathrooms || 0,
    gargage: listingCase.garages || 0,
    floorPlan: listingCase.floorArea || 0,
    price: listingCase.price
  }

  const images = mapMediaAssetsToImages(listingCase.mediaAssets.picture)
  const floorPlanImages = mapMediaAssetsToImages(listingCase.mediaAssets.floorPlan)
  const videos = listingCase.mediaAssets.video

  return (
    <>
      <Navbar showDownload={true} items={navItem} />
      <PropertyBanner property={propertyData} heroImage={images.length > 0 ? images[0].src : "/images/image.png"} />

      <PropertyDescription description={listingCase.description} listingId={listingCase.id}/>

      <div className="h-2 bg-[#f3f3f3]"></div>
      
      <Photography images={images} />

      <div className="h-2 bg-[#f3f3f3]"></div>

      <FloorPlan floorPlanImages={floorPlanImages} />

      <div className="h-2 bg-[#f3f3f3]"></div>

      <Videography videos={videos} />

      <div className="h-2 bg-[#f3f3f3]"></div>

      <LocationDisplay property={propertyData} />

      <div className="h-2 bg-[#f3f3f3]"></div>
      
      <Contact agents={listingCase.agents} />
    </>
  )
}

function getSaleCategoryName(saleCategory: number): string {
  switch (saleCategory) {
    case 1:
      return 'Sale'
    case 2:
      return 'Rent'
    case 3:
      return 'Auction'
    default:
      return 'Unknown'
  }
}

export default PropertyHome