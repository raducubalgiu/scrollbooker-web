import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessCoordinatesType } from "../BusinessResponse";
import { ProductType } from "../../product/Product";
import { BusinessOwner } from "../BusinessOwner";
import { BusinessMediaFile } from "../BusinessMediaFile";

export interface BusinessSheet {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinatesType;
  has_video: boolean;
  media_files: BusinessMediaFile[];
  products: ProductType[];
  distance: number | undefined | null;
}

export type BusinessSheetResponse = PaginatedData<BusinessSheet>;
