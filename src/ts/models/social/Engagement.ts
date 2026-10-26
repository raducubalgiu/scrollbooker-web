import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "../../enums/EngagementSourceEnum";

export interface EngagementCreate {
  event_id: string;
  click_type: ContactClickTypeEnum;
  source: EngagementSourceEnum;
  captured_at: number;
  viewer_fingerprint_hash?: string;
}

export interface ContactClickCreate {
  event_id: string;
  user_id: number;
  business_id: number;
  click_type: ContactClickTypeEnum;
  source: EngagementSourceEnum;
  captured_at: number;
  viewer_fingerprint_hash?: string;
}

export interface ProfileVisitsCreate {
  event_id: string;
  user_id: number;
  post_id: number | null;
  source: EngagementSourceEnum;
  captured_at: number;
  viewer_fingerprint_hash?: string;
}
