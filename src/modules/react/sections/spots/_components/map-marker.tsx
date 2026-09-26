import { ExtendedClimbingSpot } from '@/modules/core/model/ClimbingSpot';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

interface MapMarkerProps {
  spot: ExtendedClimbingSpot;
  onSelect: (spot: ExtendedClimbingSpot) => void;
  showTooltip: boolean;
}

const icon = L.icon({
  iconUrl: '/assets/marker.png',
  iconSize: [40, 40], // taille en pixels [largeur, hauteur]
  iconAnchor: [20, 20], // icon anchor [x, y] relative to the top-left corner
  popupAnchor: [0, -40], // popup anchor relative to the top-left corner
  tooltipAnchor: [10, 0], // tooltip anchor relative to the top-left corner
});

const MapMarker = ({ spot, onSelect, showTooltip }: MapMarkerProps) => {
  return (
    <Marker
      key={spot.id}
      position={[spot.latitude, spot.longitude]}
      eventHandlers={{
        click: () => onSelect(spot),
      }}
      icon={icon}
    >
      {showTooltip && (
        <Tooltip direction="right" permanent={true}>
          {spot.name}
        </Tooltip>
      )}
    </Marker>
  );
};

export default MapMarker;
