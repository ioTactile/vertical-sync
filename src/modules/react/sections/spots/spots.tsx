import ClimbingSpotsMap from "@/modules/react/sections/spots/_components/climbing-spots-map";

const Spots = () => {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Spots d&apos;escalade
      </h1>
      <ClimbingSpotsMap />
    </div>
  );
};

export default Spots;
