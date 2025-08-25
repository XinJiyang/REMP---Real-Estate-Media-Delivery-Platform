import React, { useState } from "react";
import listingApi from "../../apis/listingcaseAPIs";
import PropertyDescriptionPopup from "../EditPopupComponents/property-description-popup";

interface PropertyDescriptionProps {
  description?: string | null;
  listingId: number;
  onDescriptionUpdated?: (newDescription: string) => void;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ 
  description: initialDescription,
  listingId,
  onDescriptionUpdated
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState<string | null | undefined>(initialDescription);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDescription = async (newDescription: string) => {
    try {
      setIsLoading(true);
      
      const response = await listingApi.updateListingCase(listingId, {
        description: newDescription
      });
      
      setDescription(newDescription);
      
      if (onDescriptionUpdated) {
        onDescriptionUpdated(newDescription);
      }
    } catch (error) {
      console.error("Failed to update property description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Property Description
      </h1>
      {description ? (
        <div className="max-w-4xl text-center mx-auto">
          <p className="line-clamp-2">{description}</p>
          <button 
            className="mt-4 underline text-[#324361] font-bold"
            onClick={handleOpenModal}
          >
            Edit description
          </button>
        </div>
      ) : (
        <>
          <p className="text-[#6F809E]">Please add property description here</p>
          <button 
            className="underline text-[#324361] font-bold"
            onClick={handleOpenModal}
          >
            Click to add
          </button>
        </>
      )}

      {isModalOpen && (
        <PropertyDescriptionPopup
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          initialDescription={description}
          onSave={handleSaveDescription}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default PropertyDescription;