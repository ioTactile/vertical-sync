import { Input } from "@/app/_components/ui/input";
import * as React from "react";

interface PlaceSearchProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  isLoaded: boolean;
}

export const PlaceSearch = ({ onPlaceSelect, isLoaded }: PlaceSearchProps) => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const autoCompleteRef = React.useRef<google.maps.places.Autocomplete | null>(
    null
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const options = {
      fields: ["address_components", "geometry", "name", "formatted_address"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      if (!autoCompleteRef.current) return;
      const place = autoCompleteRef.current.getPlace();
      onPlaceSelect(place);
      setSearchInput("");
    });
  }, [onPlaceSelect, isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value || "");
  };

  if (!isLoaded) {
    return (
      <Input disabled placeholder="Chargement de Google Maps..." value="" />
    );
  }

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder="Rechercher un lieu..."
      value={searchInput}
      onChange={handleInputChange}
      className="mb-4"
    />
  );
};
