'use client';

import { useMap } from 'react-leaflet';
import { FullScreen } from 'leaflet.fullscreen';
import 'leaflet.fullscreen/dist/Control.FullScreen.css';
import * as React from 'react';

interface MapFullscreenControlProps {
  /** Ref to the wrapper (filters + map) to fullscreen the whole block */
  fullscreenWrapperRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Adds the fullscreen button on the map via leaflet.fullscreen (brunob).
 * If fullscreenWrapperRef is provided, that wrapper (e.g. filters + map) goes fullscreen.
 * @see https://github.com/brunob/leaflet.fullscreen
 */
const MapFullscreenControl = ({ fullscreenWrapperRef }: MapFullscreenControlProps) => {
  const map = useMap();

  React.useEffect(() => {
    const wrapperEl = fullscreenWrapperRef?.current ?? null;
    const control = new FullScreen({
      position: 'bottomright',
      title: 'Plein écran',
      titleCancel: 'Quitter le plein écran',
      fullscreenElement: wrapperEl ?? undefined,
    });
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map, fullscreenWrapperRef]);

  return null;
};

export default MapFullscreenControl;
