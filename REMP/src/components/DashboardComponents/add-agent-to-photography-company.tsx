import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import cookieService from '../../config/cookie';
import userApi from '../../apis/userAPIs';
import { SearchAgentResponseDto } from '../../interface/agent';
import photographyCompanyApi from '../../apis/photographyCompanyApis';

interface AddAgentToCompanyProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentAdded: () => void;
}

const AddAgentToCompany: React.FC<AddAgentToCompanyProps> = ({ isOpen, onClose, onAgentAdded }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [agentData, setAgentData] = useState<SearchAgentResponseDto>({
    id:'',
    agentFirstName: '',
    agentLastName: '',
    email: '',
    phoneNumber: '',
    companyName: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [agentFound, setAgentFound] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookieService.getToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  const resetForm = () => {
    setSearchQuery('');
    setAgentData({
      id: '',
      agentFirstName: '',
      agentLastName: '',
      email: '',
      phoneNumber: '',
      companyName: ''
    });
    setError('');
    setAgentFound(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setSearching(true);
      setError('');
      
      const token = cookieService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await userApi.findAgentByEmail(searchQuery);
      const agentDetails = response.data;
      
      if (agentDetails) {
        setAgentData({
          id: agentDetails.id,
          agentFirstName: agentDetails.agentFirstName,
          agentLastName: agentDetails.agentLastName,
          email: agentDetails.email,
          phoneNumber: agentDetails.phoneNumber,
          companyName: agentDetails.companyName
        });
        setAgentFound(true);
      } else {
        setError('No agent found with this search query');
        setAgentFound(false);
        setAgentData({
          id: '',
          agentFirstName: '',
          agentLastName: '',
          email: '',
          phoneNumber: '',
          companyName: ''
        });
      }
    } catch (error: any) {
      console.error('Error searching for agent:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to search for agent. Please try again.');
      }
      setAgentFound(false);
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const token = cookieService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      await photographyCompanyApi.addAgentToPhotographyCompany(agentData.id);
      onAgentAdded();
      resetForm();
      onClose();
    } catch (error: any) {
      console.error('Error adding agent to company:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to add agent to company. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
        <div className="flex flex-col justify-between mb-3">
          <button onClick={handleClose} className="ml-auto text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-md font-semibold text-gray-800">Add Agent to Company</h2>
          <p className="text-xs">Search for an agent to add to your company.</p>
        </div>

        <div className='h-[1.5px] bg-[#F2F2F2]'></div>
        
        {error && (
          <div className="mt-3 bg-red-50 p-3 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className='max-h-96 overflow-y-auto'
           style={{
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
          }}>
            <div className="mb-6 mt-9">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Search Agent</label>
              <div className="relative">        
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email"
                  className="pl-10 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <button 
                  type="button" 
                  onClick={handleSearch} 
                  disabled={searching || !searchQuery.trim()}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-blue-500 font-medium disabled:text-gray-300"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Agent Name</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={agentData.agentFirstName}
                    className="pl-4 w-full border border-gray-300 bg-gray-50 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={agentData.agentLastName}
                    className="pl-4 w-full border border-gray-300 bg-gray-50 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Email</label>
              <div>        
                <input 
                  type="email" 
                  value={agentData.email}
                  className="pl-4 w-full border border-gray-300 bg-gray-50 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
                  readOnly
                />    
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Company</label>
              <div>        
                <input 
                  type="text" 
                  value={agentData.companyName}
                  className="pl-4 w-full border border-gray-300 bg-gray-50 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
                  readOnly
                />    
              </div>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>

            <div className="my-6">
              <label className="block text-xs text-gray-700 font-semibold mb-2">Phone Number</label>
              <div>        
                <input 
                  type="tel" 
                  value={agentData.phoneNumber}
                  className="pl-4 w-full border border-gray-300 bg-gray-50 rounded-md py-2 px-3 text-gray-700 focus:outline-none"
                  readOnly
                />    
              </div>
            </div>
          </div>

          <div className="border-t border-gray-[#F2F2F2] flex justify-end gap-3 pt-6">
            <button 
              type="button" 
              onClick={handleClose} 
              className="text-sm py-2 w-24 text-center border-2 border-black text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || !agentFound}
              className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Adding...' : 'Add Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentToCompany;