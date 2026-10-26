import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  ContactClickCreate,
  EngagementCreate,
  ProfileVisitsCreate,
} from "@/ts/models/social/Engagement";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";

const ENGAGEMENT_PATH = "/api/protected";

type RecordPostContactClickParams = {
  postId: number;
  clickType: ContactClickTypeEnum;
  source: EngagementSourceEnum;
};

const recordPostContactClick = ({
  postId,
  clickType,
  source,
}: RecordPostContactClickParams) => {
  const body: EngagementCreate = {
    event_id: crypto.randomUUID(),
    click_type: clickType,
    source,
    captured_at: Date.now(),
  };

  return axios.post(`${ENGAGEMENT_PATH}/posts/${postId}/contact-clicks`, body);
};

export const useRecordPostContactClick = () => {
  return useMutation({
    mutationFn: recordPostContactClick,
  });
};

type RecordContactClickParams = {
  userId: number;
  businessId: number;
  clickType: ContactClickTypeEnum;
  source: EngagementSourceEnum;
};

const recordContactClick = ({
  userId,
  businessId,
  clickType,
  source,
}: RecordContactClickParams) => {
  const body: ContactClickCreate = {
    event_id: crypto.randomUUID(),
    user_id: userId,
    business_id: businessId,
    click_type: clickType,
    source,
    captured_at: Date.now(),
  };

  return axios.post(`${ENGAGEMENT_PATH}/contact-clicks`, body);
};

export const useRecordContactClick = () => {
  return useMutation({
    mutationFn: recordContactClick,
  });
};

type RecordProfileVisitParams = {
  userId: number;
  postId: number | null;
  source: EngagementSourceEnum;
};

const recordProfileVisit = ({
  userId,
  postId,
  source,
}: RecordProfileVisitParams) => {
  const body: ProfileVisitsCreate = {
    event_id: crypto.randomUUID(),
    user_id: userId,
    post_id: postId,
    source,
    captured_at: Date.now(),
  };

  return axios.post(`${ENGAGEMENT_PATH}/profile-visits`, body);
};

export const useRecordProfileVisit = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (params: RecordProfileVisitParams) => {
      if (params.userId === session?.user_id) {
        return Promise.resolve(null);
      }
      return recordProfileVisit(params);
    },
  });
};
