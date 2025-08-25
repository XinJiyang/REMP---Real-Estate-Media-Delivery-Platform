import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import Avatar from "@mui/material/Avatar";
import { MessageCircleMore } from "lucide-react";
import { Agent } from "../../interface/agent";

interface PropertyDescriptionProps{
  description:string;
  agents:Agent[];
}

const PropertyDescriptionPreview:React.FC<PropertyDescriptionProps> = ({description,agents}) =>{
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return(
    <div className="flex flex-col items-center gap-4 pt-14 pb-10 justify-center ">
      <h1 className="font-abhaya font-bold text-3xl">
        Property Description
      </h1>
      <p 
        className={`text-[#6F809E] w-1/2 ${!expanded ? "line-clamp-2" : ""}`}
      >
        {description || "Please add property description here"}
      </p>
      {description && description.length > 0 && (
        <button 
          className="underline text-[#324361] font-bold" 
          onClick={toggleExpand}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
      <div className="">
        <HoverCard >
          <HoverCardTrigger asChild>
          <button 
            className="bg-gradient-to-r from-[#1BACF7] via-[#20B3FF] to-[#0085CA] text-white py-2 px-4 rounded-md flex items-center gap-2 hover:shadow-lg transition-all duration-300"
          >
            <MessageCircleMore size={18} />
            Contact
          </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex flex-col justify-between space-x-4 h-auto">
              {agents.map((agent)=>(
                <div className="flex">
                  <Avatar>
                  <img src={agent.agentImage} />
                
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{agent.name}</h4>
                    <p className="text-sm">
                      {agent.company}
                    </p>
                    
                  </div>
                </div>
              ))}
              
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}

export default PropertyDescriptionPreview;