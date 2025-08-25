import { useState } from "react";
import AgentContactPopup from "../AgentContactComponents/agent-contact-popup";
import EditButton from "../edit-button";

const ContactEdit: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Contact
      </h1>
      <p className="text-[#6F809E]">Please add agents contact</p>
      <button 
        className="underline text-[#324361] font-bold"
      >
        Click to add
      </button>
      <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
        <div className="flex flex-col gap-3 justify-center items-center">
          <EditButton  onClick={handleOpenPopup}/>
          <p className="text-[#E4E4E4]">Add property description</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
      </div>
      
      <AgentContactPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
      />
    </div>
  );
};

export default ContactEdit;