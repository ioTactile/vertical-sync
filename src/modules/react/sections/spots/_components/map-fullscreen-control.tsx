"use client";

import { useMap } from "react-leaflet";
import { FullScreen } from "leaflet.fullscreen";
import "leaflet.fullscreen/dist/Control.FullScreen.css";
import * as React from "react";

interface MapFullscreenControlProps {
  /** Ref vers le wrapper (filtres + carte) pour mettre tout le bloc en plein écran */
  fullscreenWrapperRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Ajoute le bouton pleine écran sur la carte via leaflet.fullscreen (brunob).
 * Si fullscreenWrapperRef est fourni, c'est ce wrapper (ex. filtres + carte) qui passe en plein écran.
 * @see https://github.com/brunob/leaflet.fullscreen
 */
const MapFullscreenControl = ({
  fullscreenWrapperRef,
}: MapFullscreenControlProps) => {
  const map = useMap();

  React.useEffect(() => {
    const wrapperEl = fullscreenWrapperRef?.current ?? null;
    const control = new FullScreen({
      position: "bottomright",
      title: "Plein écran",
      titleCancel: "Quitter le plein écran",
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
