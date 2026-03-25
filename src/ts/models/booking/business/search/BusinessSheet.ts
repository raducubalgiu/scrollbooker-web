import { PaginatedData } from "@/components/core/Table/Table";
import { ProductType } from "../../product/Product";
import { BusinessOwner } from "../BusinessOwner";
import { BusinessMediaFile } from "../BusinessMediaFile";
import { BusinessCoordinates } from "../BusinessResponse";

export interface BusinessSheet {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinates;
  has_video: boolean;
  media_files: BusinessMediaFile[];
  products: ProductType[];
  distance: number | null;
}

export type BusinessSheetResponse = PaginatedData<BusinessSheet>;
