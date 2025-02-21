import { ClimbingSpot } from "@prisma/client";

interface ClimbingSpotSelectedProps {
  spot: ClimbingSpot;
}

const ClimbingSpotSelected = ({ spot }: ClimbingSpotSelectedProps) => {
  return (
    <div
      className="absolute top-0 left-0 w-[300px] h-[600px] border-r border-r-border  
      bg-white z-500 shadow-[2px_0px_5px_rgba(0,0,0,0.1)]"
    >
      <div className="flex flex-col gap-4 px-4 mt-20 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold">{spot.name}</h2>
        <p className="text-sm text-gray-500">{spot.description}</p>
      </div>
    </div>
  );
};

export default ClimbingSpotSelected;
