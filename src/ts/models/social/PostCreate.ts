import { GenderTypeEnum } from "@/ts/enums/GenderTypeEnum";

export interface PostCreate {
  description: string | null;
  provider: string;
  provider_uid: string;
  order_index: number;
  linked_product_ids: number[];
  custom_cover?: string | null;
  service_domain_id: number | null;
  target_gender: GenderTypeEnum;
}
