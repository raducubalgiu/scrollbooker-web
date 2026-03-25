import { BusinessOwner } from "../BusinessOwner";
import { BusinessMediaFile } from "../BusinessMediaFile";
import { BusinessCoordinates } from "../Business";
import { Product } from "../../product/Product";

export interface BusinessSheet {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinates;
  has_video: boolean;
  media_files: BusinessMediaFile[];
  products: Product[];
  distance: number | null;
}
