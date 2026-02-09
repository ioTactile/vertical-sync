"use client";

import {
  SPOT_PIN_COLORS,
  type SpotPinCategory,
} from "@/modules/react/sections/spots/_components/spot-pin-color";
import { Layers } from "lucide-react";
import * as React from "react";
import { Button } from "@/app/_components/ui/button";

const LEGEND_LABELS: Record<SpotPinCategory, string> = {
  indoor: "Salle indoor",
  boulder: "Bloc",
  lead: "Voie",
  psicobloc: "Psicobloc",
  multi: "Multi types",
  outdoor: "Extérieur",
};

const ORDER: SpotPinCategory[] = [
  "indoor",
  "boulder",
  "lead",
  "psicobloc",
  "multi",
  "outdoor",
];

interface SpotPinLegendProps {
  spotCount?: number;
}

const SpotPinLegend = ({ spotCount }: SpotPinLegendProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      if (typeof window !== "undefined" && window.innerWidth >= 640) return;
      setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const legendContent = (
    <>
      <div className="mb-1.5 font-medium text-foreground">Types</div>
      <ul className="flex gap-1 flex-col">
        {ORDER.map((key) => (
          <li key={key} className="flex items-center gap-1.5 sm:gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full border-2 border-slate-800"
              style={{ backgroundColor: SPOT_PIN_COLORS[key] }}
              aria-hidden
            />
            <span className="text-muted-foreground">{LEGEND_LABELS[key]}</span>
          </li>
        ))}
      </ul>
      {typeof spotCount === "number" && spotCount > 0 && (
        <p className="mt-2 pt-2 border-t border-border font-medium text-foreground">
          {spotCount} spot{spotCount > 1 ? "s" : ""} trouvé
          {spotCount > 1 ? "s" : ""}
        </p>
      )}
    </>
  );

  const panelClassName =
    "rounded-lg border border-border bg-background/95 px-3 py-2 text-xs shadow-sm backdrop-blur";

  return (
    <div className="absolute bottom-4 left-4 z-[1000]">
      {/* Mobile : bouton rond quand fermé, panel quand ouvert */}
      {!isOpen && (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="h-11 w-11 rounded-full border border-border bg-background/95 shadow-sm backdrop-blur sm:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir la légende"
          aria-expanded={false}
        >
          <Layers className="h-5 w-5" />
        </Button>
      )}
      {/* Panel : visible quand ouvert (mobile) ou toujours (desktop). Ref pour fermer au clic extérieur (mobile). */}
      <div
        ref={isOpen ? containerRef : undefined}
        className={
          isOpen
            ? `sm:block ${panelClassName}`
            : `hidden sm:block ${panelClassName}`
        }
      >
        {legendContent}
      </div>
    </div>
  );
};

export default SpotPinLegend;
