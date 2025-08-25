
interface EditButtonProps{
  text?:string;
  onClick: () => void;
}

const EditButton:React.FC<EditButtonProps> = ({text,onClick}) => {
  return(
    <>
      <button className="text-sm font-medium bg-white px-6 py-2 rounded-md" onClick={onClick}>
        <span className="flex flex-row gap-2 items-center">
          {!text&&(
            <img 
              className="w-3 h-3" 
              src="/images/edit-icon.svg"
            />
          )}
          {text??"Edit"}
        </span>
      </button>
    </>
  )
}

export default EditButton