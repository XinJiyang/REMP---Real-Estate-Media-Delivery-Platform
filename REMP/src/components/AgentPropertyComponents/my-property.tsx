import React, { useState, useEffect } from 'react';
import { Search, FileText, Home } from 'lucide-react';
import MediaTag from './media-tag';
import { formatDate } from '../../utils/format-date';
import listingApi from '../../apis/listingcaseAPIs';
import { ListcaseStatus, ListingCase } from '../../interface/listing-case';
import { useNavigate } from 'react-router-dom';


const AgentProperty: React.FC = () => {
  const [filter, setFilter] = useState<ListcaseStatus | 'All'>('All');
  const [listingCases, setListingCases] = useState<ListingCase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchListingCases = async () => {
    setIsLoading(true);
    try {
      const response = await listingApi.getListings();
      setListingCases(response.data);
    } catch (error) {
      console.error('Error fetching listing cases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListingCases();
  }, []);

  const filteredOrders = filter === 'All'
    ? listingCases
    : listingCases.filter(property => property.listcaseStatus === filter);

  const getMediaStatus = (property: ListingCase) => {
    return {
      photography: true,
      floorPlan: property.bedrooms > 1,
      videography: property.bedrooms > 3,
      vrTour: false,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex flex-col gap-4 bg-white border-b border-gray-200 px-24 pt-10">
        <div className="container justify-between items-center">
          <p className="text-gray-500 text-sm">Hi, Jane Doe</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">My Property</h1>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-3xl bg-[#EDEEF4] focus:outline-none"
              placeholder="Search My Property"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex gap-12 px-24 py-4">
        {/* Filter Tabs */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            className={`py-3 px-16 text-center rounded-md ${filter === 'All' ? 'font-semibold bg-[#E8ECF0]' : 'bg-transparent'}`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className={`py-3 px-24 text-center rounded-md ${filter === ListcaseStatus.Created ? 'font-semibold bg-[#E8ECF0]' : 'bg-transparent'}`}
            onClick={() => setFilter(ListcaseStatus.Created)}
          >
            Created
          </button>
          <div className="flex flex-col">
            <button
              className={`py-3 px-24 text-center rounded-md ${filter === ListcaseStatus.Pending ? 'font-semibold bg-[#E8ECF0]' : 'bg-transparent'}`}
              onClick={() => setFilter(ListcaseStatus.Pending)}
            >
              Pending
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className={`py-3 px-24 text-center rounded-md ${filter === ListcaseStatus.Delivered ? 'font-semibold bg-[#E8ECF0]' : 'bg-transparent'}`}
              onClick={() => setFilter(ListcaseStatus.Delivered)}
            >
              Delivered
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-md shadow-sm p-8 text-center">
              <p className="text-gray-500">No properties found</p>
            </div>
          ) : (
            filteredOrders.map((property) => (
              <div key={property.id} className="bg-white rounded-md shadow-sm overflow-hidden">
                <div className="px-8 py-4 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-lg text-[#6F809E]">Property # {property.id}</p>
                      <p className="text-xs text-[#B7BDC7]">Created on {formatDate(new Date(property.createdAt))}</p>
                    </div>
                    <span className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm ${
                      property.listcaseStatus === ListcaseStatus.Created
                        ? 'bg-[#81BAF0] text-white'
                        : property.listcaseStatus === ListcaseStatus.Pending
                          ? 'bg-[#cfc95d] text-white'
                          : 'bg-[#5DCF96] text-white'
                    }`}>
                      {ListcaseStatus[property.listcaseStatus]}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className='h-[1.5px] bg-[#F2F2F2]'></div>

                  <h2 className="text-xl font-semibold mt-5 mb-2">
                    {property.street}, {property.city}, {property.state}, {property.postcode}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <MediaTag medias={getMediaStatus(property)} />
                  </div>

                  <div className="flex justify-end">
                    <button 
                      className="text-[#B7BDC7] text-sm hover:underline"
                      onClick={()=>navigate(`/property/${property.id}`)}
                    >
                      View property details →
                    </button>
                  </div>
                </div>

                {property.listcaseStatus === ListcaseStatus.Delivered && (
                  <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3">
                    <button className="flex items-center px-5 py-1 border border-black rounded-3xl text-black">
                      <FileText className="w-4 h-4 mr-2" />
                      Invoice
                    </button>
                    <button
                      className="flex items-center px-5 py-1 bg-[#109ae3] text-white rounded-3xl"
                      onClick={() => window.open('/', '_blank')}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Property Website
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProperty;