const SquareRadio = ({ 
  id, 
  name, 
  checked, 
  onChange, 
  label 
}: { 
  id: string; 
  name: string; 
  value: string; 
  checked: boolean; 
  onChange: () => void; 
  label: string; 
}) => {
  return (
    <div className="flex items-center">
      <input  
        type="radio"  
        id={id}
        name={name}  
        checked={checked}  
        onChange={onChange}  
        className="sr-only" 
      />
      <label 
        htmlFor={id} 
        className={`flex rounded-sm items-center justify-center h-3.5 w-3.5 border ${
          checked 
            ? 'bg-[#202E47] border-[#202E47]' 
            : 'bg-white border-gray-300'
        } cursor-pointer`}
      >
        {checked && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        )}
      </label>
      <span className="ml-2 text-[#221E2E] text-sm">{label}</span>
    </div>
  );
};

export default SquareRadio;