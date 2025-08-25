export interface Property {
  id: number;
  title:string;
  propertyType: string;
  description: string;
  longitude: number | null;
  latitude: number | null;
  street: string;
  city: string;
  state: string;
  postcode: number;
  bedroom: number;
  bathroom: number;
  gargage: number;
  floorPlan: number;
  price?: number | null;
}

export interface ListingCase {
  id:number;
  title: string;
  propertyType: number;
  saleCategory: number;
  street: string | null;
  city: string | null;
  state: string | null;
  postcode: number | null;
  price: number | null;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  floorArea: number;
  userId: string;
  listcaseStatus: number;
  createdAt: string;
  isDeleted: boolean;
  statusLogs: any[];
}

export enum PropertyType {
  House = 1,
  Townhouse = 2,
  Villa = 3,
  ApartmentUnit = 4,
  Others = 5
}

export enum ListcaseStatus {
  Created = 1,
  Pending = 2,
  Delivered = 3,
}

export enum SaleCategory {
  ForSale = 1,
  ForRent = 2,
  Auction = 3
}

export enum MediaType {
  Picture = 1,
  Video = 2,
  FloorPlan = 3,
  VRTour = 4,
}

export interface ListingCaseCreateRequest {
  title: string;
  propertyType: PropertyType;
  saleCategory: SaleCategory;
  street?: string;
  city?: string;
  state?: string;
  postcode?: number;
  longitude?: number;
  latitude?: number;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  floorArea?: number;
}

export interface MediaAssetDto {
  id: number;
  mediaType: MediaType;
  mediaUrl?: string | null;
  uploadedAt: string;
  isSelect: boolean;
  isHero: boolean;
}

export interface CategorizedMediaAssetsDto {
  picture: MediaAssetDto[];
  video: MediaAssetDto[];
  floorPlan: MediaAssetDto[];
  vrTour: MediaAssetDto[];
}

export interface AgentDto {
  id: string;
  agentFirstName?: string | null;
  agentLastName?: string | null;
  avatarUrl?: string | null;
  companyName?: string | null;
}
export interface AddAgentToListingCaseDto{
  agentId:string;
  listingCaseId:number;
}
export interface RemoveAgentFromListingCaseDto {
  agentId: string;
  listingCaseId: number;
}

export interface CaseContactDto {
  contactId: number;
  firstName: string;
  lastName: string;
  companyName: string;
  profileUrl: string;
  email: string;
  phoneNumber: string;
}

export interface ListingCaseDetailResponseDto {
  id: number;
  title: string;
  description?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  garages?: number | null;
  floorArea?: number | null;
  createdAt: string; 

  propertyType: PropertyType;
  saleCategory: SaleCategory;
  listcaseStatus: ListcaseStatus;

  mediaAssets: CategorizedMediaAssetsDto;
  caseContacts: CaseContactDto[];
  agents: AgentDto[];
}

export interface ListingCaseUpdateRequestDto {
  title?: string;
  description?: string | null;
  propertyType?: PropertyType;
  saleCategory?: SaleCategory;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: number | null;
  longitude?: number | null;
  latitude?: number | null;
  price?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  garages?: number | null;
  floorArea?: number | null;
}