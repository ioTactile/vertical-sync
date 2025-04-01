declare namespace google.maps {
  export class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
  }

  export interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
  }

  export class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }
}

declare namespace google.maps.places {
  export class Autocomplete {
    constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
    addListener(eventName: string, handler: () => void): void;
    getPlace(): PlaceResult;
  }

  export interface AutocompleteOptions {
    fields?: string[];
  }

  export interface PlaceResult {
    name?: string;
    formatted_address?: string;
    geometry?: {
      location: google.maps.LatLng;
    };
    address_components?: AddressComponent[];
  }

  export interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
}
