import React, { useState, useEffect, useRef } from 'react';
import CreateAgent from './create-new-agent';
import userApi from '../../apis/userAPIs';
import { AgentResponseDto, SearchAgentResponseDto } from '../../interface/agent';
import EditAgent from './edit-agent';
import { useToast } from '../../hooks/use-toast';
import useDebounce from '../../hooks/useDebounce';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const AgentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);
  const [isEditAgentOpen, setIsEditAgentOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<AgentResponseDto | null>(null);
  const [agents, setAgents] = useState<AgentResponseDto[]>([]);
  const [searchResults, setSearchResults] = useState<SearchAgentResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openAgentId, setOpenAgentId] = useState<string | null>(null);
  const { toast } = useToast();

  const openCreateAgent = () => setIsCreateAgentOpen(true);
  const closeCreateAgent = () => setIsCreateAgentOpen(false);
  
  const openEditAgent = (agent: AgentResponseDto) => {
    setCurrentAgent(agent);
    setIsEditAgentOpen(true);
  };

  const closeEditAgent = () => {
    setIsEditAgentOpen(false);
    setCurrentAgent(null);
  };
  
  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchAgents(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const fetchAgents = async () => {
    try {
      const response = await userApi.getAllAgents();
      setAgents(response.data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchAgents = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await userApi.searchAgents(term);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search agents:', error);
      toast({
        variant: "destructive",
        description: "Failed to search agents",
      });
    } finally {
      setSearchLoading(false);
    }
  };


  
  const handleEdit = (id: string) => {
    const agentToEdit = agents.find(agent => agent.id === id);
    if (agentToEdit) {
      openEditAgent(agentToEdit);
    }
    setOpenAgentId(null);
  };

  const handleDelete = async (id: string) => {
    await userApi.deleteAgent(id);

    fetchAgents();
    toast({
      description: "Agent deleted successfully",
    });

    setOpenAgentId(null);
  };

  const displayAgents = debouncedSearchTerm
    ? searchResults.map(result => ({
        id: result.id,
        firstName: result.agentFirstName,
        lastName: result.agentLastName,
        companyName: result.companyName,
        email: result.email,
        phoneNumber: result.phoneNumber
      }))
    : agents;
  
  return (
    <div className="w-full py-4">
      {openAgentId !== null && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpenAgentId(null)}
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
        <div className="flex ml-auto">
          <button 
            className="bg-[#0085CA] text-white px-4 py-2 rounded-lg flex items-center"
            onClick={openCreateAgent}
          >
            + Create New Agent
          </button>
        </div>
      </div>
      

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading agents...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayAgents.length > 0 ? (
                  displayAgents.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {agent.firstName} {agent.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.phoneNumber || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <DropdownMenu
                          open={openAgentId === agent.id}
                          onOpenChange={(open) => setOpenAgentId(open ? agent.id : null)}
                        >
                          <DropdownMenuTrigger asChild>
                            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-32" align="end">
                            <DropdownMenuItem onClick={() => handleEdit(agent.id)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(agent.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm ? "No agents found matching your search" : "No agents available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        <CreateAgent 
          isOpen={isCreateAgentOpen} 
          onClose={closeCreateAgent} 
          refetch={fetchAgents}
        />
        
        {currentAgent && (
          <EditAgent 
            isOpen={isEditAgentOpen} 
            onClose={closeEditAgent} 
            agent={currentAgent}
            refetch={fetchAgents}
          />
        )}
      </div>
    </div>
  );
};