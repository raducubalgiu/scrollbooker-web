import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessCoordinatesType } from "../BusinessResponse";
import { BusinessMediaFileType } from "../BusinessMediaFile";
import { ProductType } from "../../product/Product";
import { BusinessOwner } from "../BusinessOwner";

export interface BusinessSheet {
  id: number;
  owner: BusinessOwner;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinatesType;
  has_video: boolean;
  media_files: BusinessMediaFileType[];
  products: ProductType[];
  distance: number | undefined | null;
}

export type BusinessSheetResponse = PaginatedData<BusinessSheet>;
