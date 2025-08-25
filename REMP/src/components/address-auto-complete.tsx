import React, { useEffect, useRef, useState } from 'react';
import { Place } from '../interface/place';

interface AutocompleteOptions {
  types?: string[];
  componentRestrictions?: { country: string };
  fields?: string[];
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  strictBounds?: boolean;
}

declare global {
  interface Window {
    google: {
      maps: {
        importLibrary: (library: string) => Promise<any>;
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            options?: AutocompleteOptions
          ) => any;
        };
        LatLngBounds: new (sw: any, ne: any) => any;
      };
    };
  }
}

interface GooglePlacesAutocompleteProps {
  country?: string;
  types?: string[];
  onPlaceSelect?: (place: Place) => void;
  value: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  country = 'au', 
  types = ['establishment', 'geocode'],
  onPlaceSelect,
  value,
  setStreet
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        await window.google.maps.importLibrary("places");
        setIsLoaded(true);
        setError(null);
      } catch (error) {
        console.error("加载 Google Maps 失败:", error);
        setError("加载 Google Maps 失败");
      }
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        loadGoogleMaps();
      };
      script.onerror = (e) => {
        setError("Google Maps 加载失败");
      };
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }

    return () => {
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const extractAddressComponent = (components: any[] | undefined, type: string): string => {
    if (!components) return '';
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types,
        componentRestrictions: country ? { country } : undefined,
        fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id'],
        bounds: {
          north: -10.0, 
          south: -44.0, 
          east: 154.0,  
          west: 113.0   
        },
        strictBounds: true
      });
      
      autocompleteRef.current.addListener('place_changed', () => {
        try {
          const placeResult = autocompleteRef.current.getPlace();
          
          if (!placeResult || !placeResult.geometry) {
            return;
          }
          
          const processedPlace: Place = {
            name: placeResult.name,
            displayName: placeResult.name,
            formattedAddress: placeResult.formatted_address,
            location: {
              lat: placeResult.geometry.location.lat(),
              lng: placeResult.geometry.location.lng()
            },
            address_components: placeResult.address_components,
            postalCode: extractAddressComponent(placeResult.address_components, 'postal_code'),
            streetNumber: extractAddressComponent(placeResult.address_components, 'street_number'),
            streetName: extractAddressComponent(placeResult.address_components, 'route'),
            locality: extractAddressComponent(placeResult.address_components, 'locality'),
            administrativeArea: extractAddressComponent(placeResult.address_components, 'administrative_area_level_1'),
            country: extractAddressComponent(placeResult.address_components, 'country')
          };
         
          if (onPlaceSelect) {
            onPlaceSelect(processedPlace);
          }
        } catch (eventError) {
          console.error("选择出错:", eventError);
        }
      });
    } catch (error) {
      console.error("初始化失败:", error);
      setError("初始化 失败");
    }
  }, [isLoaded, country, types, onPlaceSelect]);

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        {error && (
          <div className="p-2 bg-red-50 text-red-600 rounded-md mb-2 text-sm">
            {error}
          </div>
        )}
        
        <input
          id="place-autocomplete"
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="pl-4 w-full border border-gray-300 bg-transparent rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#50B3E6]"
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default GooglePlacesAutocomplete;