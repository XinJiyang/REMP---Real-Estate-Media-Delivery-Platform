import { useState } from "react";
import EditButton from "../edit-button";

const PropertyDescriptionEdit:React.FC = () =>{
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return(
    <div className="relative flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Property Description
      </h1>
      <p className="text-[#6F809E]">Please add property description here</p>
      <button 
        className="underline text-[#324361] font-bold"
        onClick={()=>setIsEditing(true)}
      >
        Click to add
      </button>
      
      <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
        <div className="flex flex-col gap-3 justify-center items-center">
          <EditButton onClick={()=>setIsEditing(true)}/>
          <p className="text-[#E4E4E4]">Add property description</p>
        </div>
      </div>

      
      {/* 半透明层 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
      </div>
    </div>

  )
}

export default PropertyDescriptionEdit;