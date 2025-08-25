import api from "../config/axios";
import { ListingCaseStatus } from "../interface/agent-property";
import { AddAgentToListingCaseDto, ListingCaseCreateRequest, ListingCaseDetailResponseDto, ListingCaseUpdateRequestDto, MediaType, RemoveAgentFromListingCaseDto } from "../interface/listing-case";

const listingApi = {
  createListingCase: (data: ListingCaseCreateRequest) => 
    api.post<number>('/ListingCase/listings', data),
  
  getListings: () => 
    api.get('/ListingCase/listings'),

  getListingById: (id:number) => 
    api.get<ListingCaseDetailResponseDto>(`/ListingCase/${id}`),

  updateListingCase: (id: number, data: ListingCaseUpdateRequestDto) => {
    return api.put<ListingCaseDetailResponseDto>(`/ListingCase/listings/${id}`, data);
  },

  updateStatus: (id: number, newStatus: ListingCaseStatus) => {
    return api.patch(`/ListingCase/${id}/status`, {NewStatus: newStatus});
  },

  
  uploadMedia: (listingCaseId: number, files: File[], mediaType: MediaType) => {
    const formData = new FormData();
    formData.append('ListingCaseId', listingCaseId.toString());
    formData.append('Type', mediaType.toString());
    
    files.forEach(file => {
      formData.append('Files', file);
    });
    
    return api.post('/MediaAsset/uploadMediaToListingCase', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  uploadPhotos: (listingCaseId: number, files: File[]) => 
    listingApi.uploadMedia(listingCaseId, files, MediaType.Picture),
  
  uploadFloorPlan: (listingCaseId: number, file: File) => 
    listingApi.uploadMedia(listingCaseId, [file], MediaType.FloorPlan),
  
  uploadVideo: (listingCaseId: number, file: File) => 
    listingApi.uploadMedia(listingCaseId, [file], MediaType.Video),
  
  uploadVRTour: (listingCaseId: number, vrTour: File) => {
    listingApi.uploadMedia(listingCaseId, [vrTour], MediaType.VRTour);
  },

  addAgentToListingCase: (agentId: string, listingCaseId: number) => {
    const data: AddAgentToListingCaseDto = {
      agentId,
      listingCaseId
    };
    
    return api.post('/ListingCase/AddAgentToListingCase', data);
  },

  removeAgentFromListingCase: (agentId: string, listingCaseId: number) => {
    const data: RemoveAgentFromListingCaseDto = {
      agentId,
      listingCaseId
    };
    
    return api.delete('/ListingCase/RemoveAgentFromListingCase', { data });
  },
};

export default listingApi;