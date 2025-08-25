import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateListingCase from '../DashboardComponents/create-new-case';
import listingApi from '../../apis/listingcaseAPIs';
import { ListingCase } from '../../interface/listing-case';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const MyListingCase: React.FC = () => {
  const navigate = useNavigate();
  const [listingCases, setListingCases] = useState<ListingCase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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


  const getPropertyTypeName = (propertyType: number): string => {
    switch (propertyType) {
      case 1: return 'House';
      case 2: return 'Townhouse';
      case 3: return 'Villa';
      case 4: return 'Apartment/Unit';
      case 5: return 'Others';
      default: return 'Unknown';
    }
  };


  const getStatusName = (status: number): string => {
    switch (status) {
      case 1: return 'Created';
      case 2: return 'Pending';
      case 3: return 'Delivered';
      default: return 'Unknown';
    }
  };

  const getPropertyAddress = (listingCase: ListingCase): string => {
    const parts = [
      listingCase.street,
      listingCase.city,
      listingCase.state,
      listingCase.postcode
    ].filter(Boolean);
    
    return parts.length > 0 ? parts.join(', ') : 'Address not provided';
  };

  const filteredListingCases = listingCases.filter(
    (listingCase) =>
      (listingCase.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (getPropertyAddress(listingCase).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').join('/');
  };

  const handleCreateOrder = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    fetchListingCases();
  };


  const handleEdit = (id: number) => {
    navigate(`/property-edit/${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    setOpenMenuId(null);
  };

  return (
    <div className="w-full py-4 relative">
      {openMenuId !== null && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpenMenuId(null)}
        ></div>
      )}
      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-md left-1/2 transform -translate-x-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            placeholder="Search from listing case"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex ml-auto">
          <button 
            className="bg-[#0085CA] text-white px-4 py-2 rounded-lg flex items-center"
            onClick={handleCreateOrder}
          >
            + Create Property
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#0085CA] border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading listing cases...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property#
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListingCases.length > 0 ? (
                filteredListingCases.map((listingCase, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{listingCase.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getPropertyTypeName(listingCase.propertyType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getPropertyAddress(listingCase)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(listingCase.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        listingCase.listcaseStatus === 1
                          ? 'bg-yellow-100 text-yellow-800' 
                          : listingCase.listcaseStatus === 2
                          ? 'bg-blue-100 text-blue-800' 
                          : listingCase.listcaseStatus === 3
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getStatusName(listingCase.listcaseStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <DropdownMenu
                        open={openMenuId === listingCase.id}
                        onOpenChange={(open) => setOpenMenuId(open ? listingCase.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32" align="end">
                          <DropdownMenuItem onClick={() => handleEdit(listingCase.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(listingCase.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No listing cases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CreateListingCase isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default MyListingCase;