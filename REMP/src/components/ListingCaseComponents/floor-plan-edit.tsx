const FloorPlanEdit:React.FC = () =>{
  return(
    <div className="relative flex flex-col items-center gap-4 pt-14 pb-10">
      <h1 className="font-abhaya font-bold text-3xl">
        Floor Plan
      </h1>
      <img 
        className="w-3/4"
        src="/images/floor-plan.jpg" 
      />
       {/* 半透明层 */}
       <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02050B] opacity-70">
      </div>
    </div>
  )
}

export default FloorPlanEdit;