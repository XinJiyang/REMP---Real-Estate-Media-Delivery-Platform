import React from 'react';
import { AgentDto } from "../../interface/listing-case";

interface ContactProps {
  agents?: AgentDto[];
}

const Contact: React.FC<ContactProps> = ({ agents = [] }) => {
  return(
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Contact
      </h1>
      {agents.length > 0 ? (
        <div className="flex flex-row gap-8 mt-4">
          {agents.map(agent => (
            <div key={agent.id} className="flex flex-col items-center">
              <img 
                src={agent.avatarUrl || "/images/avatar-placeholder.png"} 
                alt={`${agent.agentFirstName} ${agent.agentLastName}`}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h3 className="font-semibold text-lg">{agent.agentFirstName} {agent.agentLastName}</h3>
              {agent.companyName && <p className="text-sm text-gray-600">{agent.companyName}</p>}
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-[#6F809E]">Please add agents contact</p>
          <button className="underline text-[#324361] font-bold">Click to add</button>
        </>
      )}
    </div>
  )
}

export default Contact;