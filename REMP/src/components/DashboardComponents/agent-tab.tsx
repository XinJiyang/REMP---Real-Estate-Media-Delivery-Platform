import React, { useState, useEffect } from 'react';
import { AgentDto } from '../../interface/listing-case';
import { Plus, User, X, Search } from 'lucide-react';
import { AgentResponseDto, SearchAgentResponseDto } from '../../interface/agent';
import useDebounce from '../../hooks/useDebounce';
import userApi from '../../apis/userAPIs';
import useAuth from '../../hooks/useAuth';

interface AgentsTabProps {
  agents: AgentDto[];
  onAddAgent: (agentId: string) => Promise<void>;
  onRemoveAgent: (agentId: string) => Promise<void>;
  availableAgents?: AgentResponseDto[];
  listingId?: string;
}

const AgentsTab: React.FC<AgentsTabProps> = ({ 
  agents, 
  onAddAgent, 
  onRemoveAgent,
  availableAgents = [],
  listingId
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<SearchAgentResponseDto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<SearchAgentResponseDto[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchAgents(debouncedSearchTerm);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [debouncedSearchTerm]);

  const searchAgents = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await userApi.searchAgents(term);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search agents:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddAgent = async () => {
    if (!selectedAgentId) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      await onAddAgent(selectedAgentId);
      setIsAddModalOpen(false);
      setSelectedAgentId('');
      setSearchTerm('');
      setSearchResults([]);
      setShowSearchResults(false);
    } catch (error: any) {
      if (error.response?.data?.message === 'Agent is already assigned to this listing case') {
        setError('This agent is already assigned to the listing.');
      } else {
        setError('Failed to add agent. Please try again.');
        console.error('Error adding agent:', error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveAgent = async (agentId: string) => {
    setIsProcessing(true);
    try {
      await onRemoveAgent(agentId);
    } catch (error) {
      console.error('Error removing agent:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectSearchResult = (agentId: string, agent: SearchAgentResponseDto) => {
    setSelectedAgentId(agentId);
    setSelectedAgent(agent);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const filteredAvailableAgents = availableAgents;

  const filteredSearchResults = searchResults.filter(
    agent => !agents.some(existingAgent => existingAgent.id === agent.id)
  );

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-6">
        <button 
          className="bg-[#0085CA] text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => {
            setError(null);
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </div>

      {agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md p-4 flex items-start">
              <div className="flex-shrink-0 mr-4">
                {agent.avatarUrl ? (
                  <img 
                    src={agent.avatarUrl} 
                    alt="avatar" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{agent.agentFirstName} {agent.agentLastName}</h4>
                {agent.companyName && (
                  <p className="text-sm text-gray-600">{agent.companyName}</p>
                )}
                <button 
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveAgent(agent.id)}
                  disabled={isProcessing}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No agents assigned to this property</p>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Agent</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              {user?.role === "Admin" && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Search for an Agent</h4>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                      placeholder="Search agents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchLoading && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <div className="h-4 w-4 border-t-2 border-blue-500 border-r-2 rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {showSearchResults && (
                    <div className="mt-2">
                      {filteredSearchResults.length > 0 ? (
                        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 max-h-48 overflow-y-auto">
                          {filteredSearchResults.map(agent => (
                            <div 
                              key={agent.id} 
                              className="p-2 hover:bg-gray-50 cursor-pointer flex items-center"
                              onClick={() => handleSelectSearchResult(agent.id, agent)}
                            >
                              <div>
                                <p className="font-medium text-sm">{agent.agentFirstName} {agent.agentLastName}</p>
                                <p className="text-xs text-gray-500">{agent.companyName}</p>
                                <p className="text-xs">{agent.email}</p>
                                <p className="text-xs">{agent.phoneNumber}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">
                          {searchLoading ? "Searching..." : "No agents found matching your search"}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {selectedAgent && !showSearchResults && (
                    <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <h5 className="font-medium text-sm mb-1">Selected Agent:</h5>
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mr-3">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{selectedAgent.agentFirstName} {selectedAgent.agentLastName}</p>
                          {selectedAgent.companyName && (
                            <p className="text-sm text-gray-600">{selectedAgent.companyName}</p>
                          )}
                          <p className="text-sm">{selectedAgent.email}</p>
                          <p className="text-sm">{selectedAgent.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {user?.role === "PhotographyCompany" && (
                <div>
                  <h4 className="text-md font-medium mb-2">Select from available agents</h4>
                  <select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Select an agent --</option>
                    {filteredAvailableAgents.length > 0 ? (
                      filteredAvailableAgents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.firstName} {agent.lastName} {agent.companyName ? `(${agent.companyName})` : ''}
                        </option>
                      ))
                    ) : (
                      <option disabled>No available agents to add</option>
                    )}
                  </select>
                </div>
              )}
              
              {error && (
                <p className="mt-4 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button 
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-[#0085CA] text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:text-gray-500"
                onClick={handleAddAgent}
                disabled={!selectedAgentId || isProcessing}
              >
                {isProcessing ? 'Adding...' : 'Add Agent'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentsTab;