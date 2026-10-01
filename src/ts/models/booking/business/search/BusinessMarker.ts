import { BusinessCoordinates } from "../Business";
import { BusinessMediaFile } from "../BusinessMediaFile";
import { BusinessOwner } from "../BusinessOwner";

export interface BusinessMarker {
  id: number;
  owner: BusinessOwner;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinates;
  is_primary: boolean;
  media_files: BusinessMediaFile[];
  distance: number | null;
}
