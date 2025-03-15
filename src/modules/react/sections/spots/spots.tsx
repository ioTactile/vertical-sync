import ClimbingSpotsMap from "@/modules/react/sections/spots/_components/climbing-spots-map";
import ClimbingSpotsHeader from "@/modules/react/sections/spots/_components/climbing-spots-header";

const Spots = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <ClimbingSpotsHeader />
      <ClimbingSpotsMap />
    </div>
  );
};

export default Spots;
