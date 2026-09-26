import { ExtendedClimbingSpot, ExtendedClimbingSpots } from '@/modules/core/model/ClimbingSpot';
import MapMarker from '@/modules/react/sections/spots/_components/map-marker';

interface MapMarkersProps {
  spots: ExtendedClimbingSpots;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
  showTooltips: boolean;
}

const MapMarkers = ({ spots, onSpotSelect, showTooltips }: MapMarkersProps) => {
  return (
    <>
      {spots.map((spot) => (
        <MapMarker key={spot.id} spot={spot} onSelect={onSpotSelect} showTooltip={showTooltips} />
      ))}
    </>
  );
};

export default MapMarkers;
