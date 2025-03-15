import * as L from "leaflet";

declare module "leaflet" {
  interface MarkerClusterGroupOptions {
    chunkedLoading?: boolean;
    maxClusterRadius?: number | ((zoom: number) => number);
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    animate?: boolean;
  }

  class MarkerClusterGroup extends L.FeatureGroup {
    constructor(options?: MarkerClusterGroupOptions);
    clearLayers(): this;
    addLayer(layer: L.Layer): this;
    removeLayer(layer: L.Layer): this;
  }

  function markerClusterGroup(
    options?: MarkerClusterGroupOptions
  ): MarkerClusterGroup;
}
