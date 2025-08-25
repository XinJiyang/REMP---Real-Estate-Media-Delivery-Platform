// AgentContactPopup.tsx
import React, { useState } from 'react';
import { SquarePen, Trash2, X } from 'lucide-react';
import { Agent } from '../../interface/agent';
import CreateAgent from './create-agent';

interface AgentContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const agents: Agent[] = [
  { id: 1, name: "John Doe", company: "Acme Corp", agentImage: "/images/agent-image.jpg" },
  { id: 2, name: "Jane Smith", company: "Globex Inc.", agentImage: "/images/agent-image.jpg" },
  { id: 3, name: "Alice Johnson", company: "Stark Industries", agentImage: "/images/agent-image.jpg" },
  { id: 4, name: "Bob Brown", company: "Wayne Enterprises", agentImage: "/images/agent-image.jpg" },
  { id: 5, name: "Charlie White", company: "Umbrella Corp", agentImage: "/images/agent-image.jpg" },
];

const AgentContactPopup: React.FC<AgentContactProps> = ({ isOpen, onClose }) => {
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [isCreateAgentOpen, setIsCreateAgentOpen] = useState(false);

  if (!isOpen) return null;

  const openCreateAgent = () => {
    setIsCreateAgentOpen(true);
  };

  const closeCreateAgent = () => {
    setIsCreateAgentOpen(false);
  };

  return (
    <>
      {!isCreateAgentOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl p-6">
            <div className="flex flex-col justify-between mb-3">
              <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
              <h2 className="text-md font-semibold text-gray-800">Agent Contact</h2>
              <p className="text-xs">Please complete the contact information.</p>
            </div>

            <div className='h-[1.5px] bg-[#F2F2F2]'></div>
           
            <div className='max-h-96 overflow-y-auto'
              style={{
                msOverflowStyle: 'none', 
                scrollbarWidth: 'none',
              }}
            >

              <div className="mb-6 mt-9 flex justify-center">
                <button 
                  className="text-sm text-center px-20 py-2 font-semibold text-black rounded-md border-2 border-black"
                  onClick={openCreateAgent}
                >
                  Create a new agent
                </button>
              </div>
             
              <div className="mb-6 mt-9 flex flex-col gap-3">
                <label className="block text-xs text-gray-700 font-semibold mb-2">Saved agents</label>
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-[#F5F5F5] flex px-4 py-2 items-center">        
                    <img src={agent.agentImage} className="h-14 rounded-full mr-2" alt={agent.name} />
                    <div className="flex flex-col justify-center">
                      <p className="text-black">{agent.name}</p>
                      <p className="text-sm text-[#9F9F9F]">{agent.company}</p>
                    </div>
                    <div className="ml-auto flex gap-4">
                      <SquarePen className="rounded-full"/>
                      <Trash2 className="rounded-full"/>
                      <input 
                        className="w-4"
                        type="checkbox"
                        checked={selectedAgents.includes(agent.id)}
                        onChange={() => {
                          if (selectedAgents.includes(agent.id)) {
                            setSelectedAgents(selectedAgents.filter(id => id !== agent.id));
                          } else {
                            setSelectedAgents([...selectedAgents, agent.id]);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className='h-[1.5px] bg-[#F2F2F2]'></div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button 
                type="submit" 
                className="text-sm py-2 w-24 bg-[#14a2ea] text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateAgentOpen && (
        <CreateAgent isOpen={isCreateAgentOpen} onClose={closeCreateAgent} />
      )}
    </>
  );
};

export default AgentContactPopup;