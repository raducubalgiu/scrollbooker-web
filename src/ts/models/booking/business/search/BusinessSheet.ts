import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessOwnerType } from "../BusinessOwnerType";
import { BusinessCoordinatesType } from "../BusinessResponse";
import { BusinessMediaFileType } from "../BusinessMediaFile";
import { ProductType } from "../../product/Product";

export type BusinessSheetType = {
  id: number;
  owner: BusinessOwnerType;
  business_type: string;
  business_short_domain: string;
  address: string;
  coordinates: BusinessCoordinatesType;
  has_video: boolean;
  media_files: BusinessMediaFileType[];
  products: ProductType[];
  distance: number | undefined | null;
};

export type BusinessSheetResponse = PaginatedData<BusinessSheetType>;
