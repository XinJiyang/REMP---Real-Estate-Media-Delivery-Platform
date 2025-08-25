
const Counter = ({ 
  label, 
  value, 
  onChange, 
  iconSrc 
}: { 
  label: string; 
  value: number; 
  onChange: (val: number) => void; 
  iconSrc: string; 
}) => {
  return (
    <div className="flex bg-[#F5F5F5] rounded-md py-2 pl-2 pr-4 items-center">
      <div className="p-2">
        <img src={iconSrc} 
          className="brightness-0 h-6 w-6" 
        />
      </div>
      <span className="text-gray-700 text-sm mr-6">{label}</span>
      <div className="flex items-center bg-white rounded-sm h-7 border-[1px] border-[#E4E4E4]">
        <button 
          type="button" 
          onClick={() => onChange(Math.max(0, value - 1))} 
          className="text-xs text-gray-500 pl-2 hover:text-gray-700 focus:outline-none"
        >
          −
        </button>
        <input 
          type="text" 
          value={value} 
          className="w-8 text-center text-sm border-0 bg-transparent focus:outline-none text-gray-700"
        />
        <button 
          type="button" 
          onClick={() => onChange(value + 1)} 
          className="text-xs text-gray-500 pr-2 hover:text-gray-700 focus:outline-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;