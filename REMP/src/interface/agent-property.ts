export interface AgentPropertyOverview{
  id: string,
  createdAt: Date,
  address: string,
  suburb: string,
  state: string,
  postcode: number,
  medias: MediaAvailable,
  status: ListingCaseStatus,
}

export interface MediaAvailable{
  photography:boolean,
  floorPlan:boolean,
  videography:boolean,
  vrTour:boolean
}

export enum ListingCaseStatus{
  Created = 1,
  Pending = 2,
  Delivered = 3,
}