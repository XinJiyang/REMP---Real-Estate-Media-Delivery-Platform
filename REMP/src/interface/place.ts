
export interface Place {
  displayName?: string;
  name?: string;
  formattedAddress?: string;
  formatted_address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  geometry?: {
    location: {
      lat: () => number;
      lng: () => number;
    }
  };
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  postalCode?: string;
  streetNumber?: string;
  streetName?: string;
  locality?: string;
  administrativeArea?: string;
  country?: string;
}