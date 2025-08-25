import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import listingApi from '../../apis/listingcaseAPIs';
import { ListcaseStatus, ListingCaseDetailResponseDto, ListingCaseUpdateRequestDto } from '../../interface/listing-case';
import PropertyDetailsTab from './property-detail-tab';

import { House, Images, Layout, Projector, User, Video } from 'lucide-react';
import PhotographyTab from './photography-tab';
import AgentsTab from './agent-tab';
import FloorPlanTab from './floorplan-tab';
import VideographyTab from './videography-tab';
import VRTourTab from './vrtour-tab';
import { AgentResponseDto } from '../../interface/agent';
import photographyCompanyApi from '../../apis/photographyCompanyApis';
import useAuth from '../../hooks/useAuth';
import { AxiosResponse } from 'axios';
import { ListingCaseStatus } from '../../interface/agent-property';
import { useToast } from '../../hooks/use-toast';

const DashboardPropertyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [listingCase, setListingCase] = useState<ListingCaseDetailResponseDto | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<ListingCaseDetailResponseDto>>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [showTabs, setShowTabs] = useState(true);
  const [availableAgents, setAvailableAgents] = useState<AgentResponseDto[]>([]);

  useEffect(() => {
    const fetchListingCase = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const response = await listingApi.getListingById(parseInt(id));
        setListingCase(response.data);
        
        try {
          let agentsResponse : AxiosResponse<AgentResponseDto[]> | AgentResponseDto[];
          console.log(user);
          
          if (user?.role === 'PhotographyCompany') {
            agentsResponse = await photographyCompanyApi.getAgentsByCompany();
            setAvailableAgents(agentsResponse.data);
          } else if (user?.role === 'Admin') {
            agentsResponse = [];
            setAvailableAgents(agentsResponse);
          } else {
            throw new Error('Unauthorized role');
          }
          
        } catch (error) {
          console.error('Error fetching available agents:', error);
        }
      } catch (error) {
        console.error('Error fetching listing case:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingCase();
  }, [id,user]);

  const getPropertyAddress = (listingCase: ListingCaseDetailResponseDto): string => {
    const parts = [
      listingCase.street,
      listingCase.city,
      listingCase.state,
      listingCase.postcode
    ].filter(Boolean);
    
    return parts.length > 0 ? parts.join(', ') : 'Address not provided';
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setShowTabs(false);
  };

  const handleBackToTabs = () => {
    setActiveTab(null);
    setShowTabs(true);
  };

  const handleUploadPhotos = async (files: File[]) => {
    if (!id || !files.length) return;
    
    try {
      await listingApi.uploadPhotos(parseInt(id), files);
      
      // Refresh the listing to show the new photos
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
    } catch (error) {
      console.error('Error uploading photos:', error);
      throw error;
    }
  };
  
  const handleUploadFloorPlan = async (file: File) => {
    if (!id || !file) return;
    
    try {
      await listingApi.uploadFloorPlan(parseInt(id), file);
      
      // Refresh the listing to show the new floor plan
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
    } catch (error) {
      console.error('Error uploading floor plan:', error);
      throw error;
    }
  };
  
  const handleUploadVideo = async (file: File) => {
    if (!id || !file) return;
    
    try {
      await listingApi.uploadVideo(parseInt(id), file);
      
      // Refresh the listing to show the new video
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  };
  
  const handleAddVRTour = async (vrTour: File) => {
    if (!id || !vrTour) return;
    
    try {
      await listingApi.uploadVRTour(parseInt(id), vrTour);
      
      // Refresh the listing to show the new VR tour
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
    } catch (error) {
      console.error('Error adding VR tour:', error);
      throw error;
    }
  };

  // Agent handlers
  const handleAddAgent = async (agentId: string): Promise<void> => {
    if (!id || !agentId) return;
    
    try {
      await listingApi.addAgentToListingCase(agentId, parseInt(id));
      
      // Refresh the listing to show the new agent
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
      
    } catch (error: any) {
      console.error('Error adding agent:', error);
      
      if (error.response?.status === 409 && 
          error.response?.data?.message === 'Agent is already assigned to this listing case') {
      }
      
      throw error; 
    }
  };

  const handleRemoveAgent = async (agentId: string): Promise<void> => {
    if (!id || !agentId) return;
    
    try {
      await listingApi.removeAgentFromListingCase(agentId, parseInt(id));
      
      // Refresh the listing to update the agents list
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
      
    } catch (error: any) {
      console.error('Error removing agent:', error);
      
      if (error.response?.status === 404 && 
          error.response?.data?.message === 'Agent is not assigned to this listing case') {
        // Handle case where agent is already removed
      }
      
      throw error;
    }
  };

  const handleSavePropertyDetails = async () => {
    if (!id || !listingCase) return;
    
    try {
      const updatedListingCase = { ...listingCase, ...updatedData };
      
      const updateData: ListingCaseUpdateRequestDto = {
        title: updatedListingCase.title,
        description: updatedListingCase.description,
        propertyType: updatedListingCase.propertyType,
        saleCategory: updatedListingCase.saleCategory,
        street: updatedListingCase.street,
        city: updatedListingCase.city,
        state: updatedListingCase.state,
        postcode: updatedListingCase.postcode,
        longitude: updatedListingCase.longitude,
        latitude: updatedListingCase.latitude,
        price: updatedListingCase.price,
        bedrooms: updatedListingCase.bedrooms,
        bathrooms: updatedListingCase.bathrooms,
        garages: updatedListingCase.garages,
        floorArea: updatedListingCase.floorArea
      };
      
      // Call the API to update the listing case
      const response = await listingApi.updateListingCase(parseInt(id), updateData);
      
      // Update the listing case in state with the response data
      setListingCase(response.data);
      
      // Clear the updatedData state
      setUpdatedData({});
      
      return response.data;
    } catch (error) {
      console.error('Error updating listing case:', error);
      throw error;
    }
  };

  // Helper functions to check if tab data exists
  const hasPictures = (): boolean => {
    return !!listingCase?.mediaAssets?.picture && listingCase.mediaAssets.picture.length > 0;
  };

  const hasVideos = (): boolean => {
    return !!listingCase?.mediaAssets?.video && listingCase.mediaAssets.video.length > 0;
  };

  const hasFloorPlans = (): boolean => {
    return !!listingCase?.mediaAssets?.floorPlan && listingCase.mediaAssets.floorPlan.length > 0;
  };

  const hasVRTours = (): boolean => {
    return !!listingCase?.mediaAssets?.vrTour && listingCase.mediaAssets.vrTour.length > 0;
  };

  const hasAgents = (): boolean => {
    return !!listingCase?.agents && listingCase.agents.length > 0;
  };

  // Get background color for tab
  const getTabBackgroundColor = (tabName: string): string => {
    switch (tabName) {
      case 'photography':
        return hasPictures() ? 'bg-[#E6F4FA]' : 'bg-gray-100';
      case 'videography':
        return hasVideos() ? 'bg-[#E6F4FA]' : 'bg-gray-100';
      case 'floor-plan':
        return hasFloorPlans() ? 'bg-[#E6F4FA]' : 'bg-gray-100';
      case 'vr-tour':
        return hasVRTours() ? 'bg-[#E6F4FA]' : 'bg-gray-100';
      case 'agents':
        return hasAgents() ? 'bg-[#E6F4FA]' : 'bg-gray-100';
      case 'property-details':
        return 'bg-[#E6F4FA]'; // Always has this background color
      default:
        return 'bg-gray-100';
    }
  };

  const renderTabContent = () => {
    if (!listingCase) return <div className="p-4">No property data available</div>;
    
    switch (activeTab) {
      case 'photography':
        return (
          <PhotographyTab 
            photos={listingCase.mediaAssets.picture || []} 
            setListingCase = {setListingCase}
            onUpload={handleUploadPhotos} 
          />
        );
      case 'agents':
        return (
          <AgentsTab 
            agents={listingCase.agents || []} 
            onAddAgent={handleAddAgent}
            onRemoveAgent={handleRemoveAgent}
            availableAgents={availableAgents}
          />
        );
      case 'floor-plan':
        // Get the first floor plan
        const floorPlan = listingCase.mediaAssets.floorPlan && 
                          listingCase.mediaAssets.floorPlan.length > 0 ? 
                          listingCase.mediaAssets.floorPlan[0] : null;
        return (
          <FloorPlanTab 
            floorPlan={floorPlan} 
            setListingCase = {setListingCase}
            onUpload={handleUploadFloorPlan} 
          />
        );
      case 'videography':
        // Get the first video
        const video = listingCase.mediaAssets.video && 
                      listingCase.mediaAssets.video.length > 0 ? 
                      listingCase.mediaAssets.video[0] : null;
        return (
          <VideographyTab 
            video={video} 
            setListingCase = {setListingCase}
            onUpload={handleUploadVideo} 
          />
        );
      case 'vr-tour':
        // Get the first VR tour 
        const vrTour = listingCase.mediaAssets.vrTour && 
                       listingCase.mediaAssets.vrTour.length > 0 ? 
                       listingCase.mediaAssets.vrTour[0] : null;
        return (
          <VRTourTab 
            vrTour={vrTour} 
            onUpload={handleAddVRTour} 
          />
        );
        case 'property-details':
          const handleUpdateProperty = (updatedData: Partial<ListingCaseDetailResponseDto>): void => {
            setUpdatedData(prev => ({ ...prev, ...updatedData }));
          };
  
          return <PropertyDetailsTab 
                   listingCase={{...listingCase, ...updatedData}} 
                   onUpdate={handleUpdateProperty}
                   onSave={handleSavePropertyDetails}
                 />;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };

  const handleDelivery = async () => {
    if (!id) return;
    if (!listingCase?.agents || listingCase.agents.length < 1) {
      toast({
        variant: "destructive",
        description: "Please add an agent to this property first.",
      })
      return;
    }

    try {
      await listingApi.updateStatus(parseInt(id),ListingCaseStatus.Pending);
      const updatedListing = await listingApi.getListingById(parseInt(id));
      setListingCase(updatedListing.data);
      toast({
        description: "The listing case has been handed over to assigned agent.",
      })
    } catch (error) {
      console.error('Error delivering listing:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#0085CA] border-r-transparent"></div>
        <p className="ml-2 text-gray-600">Loading property details...</p>
      </div>
    );
  }

  if (!listingCase) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Property not found
        </div>
        <div className="mt-4">
          <button 
            className="bg-[#0085CA] text-white px-4 py-2 rounded-lg"
            onClick={() => navigate('/listing-case')}
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'photography': return 'Photography';
      case 'agents': return 'Agents';
      case 'floor-plan': return 'Floor Plan';
      case 'videography': return 'Videography';
      case 'vr-tour': return 'VR Tour';
      case 'property-details': return 'Property Details';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/listing-case" className="hover:text-[#0085CA]">Property</Link>
        <span className="mx-2">›</span>
        <span className="hover:text-[#0085CA] cursor-pointer" onClick={handleBackToTabs}>
          {listingCase && getPropertyAddress(listingCase)}
        </span>
        {activeTab && (
          <>
            <span className="mx-2">›</span>
            <span>{getTabTitle()}</span>
          </>
        )}
      </div>

      {showTabs ? (
        <>
          {/* Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('photography')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('photography')}
            >
              <Images className="w-6 h-6 mb-2 text-blue-500" />
              <span className="text-xs">Photography</span>
            </button>
            
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('floor-plan')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('floor-plan')}
            >
              <Layout className="w-6 h-6 mb-2 text-orange-500" />
              <span className="text-xs">Floor Plan</span>
            </button>
            
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('videography')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('videography')}
            >
              <Video className="w-6 h-6 mb-2 text-green-600" />
              <span className="text-xs">Videography</span>
            </button>
            
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('vr-tour')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('vr-tour')}
            >
              <Projector className="w-6 h-6 mb-2 text-amber-600"/>
              <span className="text-xs">VR Tour</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('agents')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('agents')}
            >
              <User className="w-6 h-6 mb-2 text-blue-500" />
              <span className="text-xs">Agents</span>
            </button>
            
            <button
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition ${getTabBackgroundColor('property-details')} text-gray-700 hover:bg-gray-200`}
              onClick={() => handleTabChange('property-details')}
            >
              <House className="w-6 h-6 mb-2 text-purple-600"/>
              <span className="text-xs">Property details</span>
            </button>
          </div>

          <div className="mt-12 flex justify-center">
            {listingCase.listcaseStatus === ListcaseStatus.Created ? (
              <button 
                className="bg-[#0085CA] text-white px-8 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleDelivery}
              >
                Deliver to agent
              </button>
            ) : (
              <div className={`px-8 py-2 rounded-lg ${
                listingCase.listcaseStatus === ListcaseStatus.Delivered ? 
                "bg-green-500 text-white" : 
                "bg-gray-400 text-gray-100"
              }`}>
                {listingCase.listcaseStatus === ListcaseStatus.Delivered ? 
                  'Delivered' : 
                  'Pending for Review'}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-md min-h-[300px]">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{getTabTitle()}</h2>
              <button 
                onClick={handleBackToTabs}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                Back
              </button>
            </div>
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPropertyEdit;