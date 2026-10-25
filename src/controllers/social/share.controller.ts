import axios from "axios";
import { useCallback } from "react";
import { useShareContent, ShareOutcome } from "@/hooks/useShareContent";
import { ShareChannelEnum } from "@/ts/enums/ShareChannelEnum";
import { makeProfessionSlug } from "@/utils/make-profession-slug";
import { AppRoutes } from "@/utils/routes";
import { LOG } from "@/utils/logger";

const trackShare = (url: string, channel: ShareChannelEnum) => {
  axios.post(url, { channel }).catch((error) => {
    LOG.error(
      `Eroare la înregistrarea distribuirii: ${error instanceof Error ? error.message : String(error)}`
    );
  });
};

const channelFromOutcome = (
  outcome: Exclude<ShareOutcome, "cancelled">
): ShareChannelEnum =>
  outcome === "shared" ? ShareChannelEnum.OTHER : ShareChannelEnum.COPY_LINK;

type ShareUserProfileParams = {
  id: number;
  username: string;
  profession: string;
  bio?: string | null;
};

export const useShareUserProfile = () => {
  const { shareContent, copiedSnackbarOpen, closeCopiedSnackbar } =
    useShareContent();

  const shareUserProfile = useCallback(
    async ({ id, username, profession, bio }: ShareUserProfileParams) => {
      const professionSlug = makeProfessionSlug(profession);
      const url = `${window.location.origin}/user/${username}/${professionSlug}`;

      const outcome = await shareContent({
        title: "Profilul meu",
        text: bio || undefined,
        url,
      });

      if (outcome === "cancelled") return;
      trackShare(
        `/api/protected/users/${id}/share-profile`,
        channelFromOutcome(outcome)
      );
    },
    [shareContent]
  );

  return { shareUserProfile, copiedSnackbarOpen, closeCopiedSnackbar };
};

type SharePostParams = {
  postId: number;
  username: string;
  profession: string;
  description?: string | null;
};

export const useSharePost = () => {
  const { shareContent, copiedSnackbarOpen, closeCopiedSnackbar } =
    useShareContent();

  const sharePost = useCallback(
    async ({ postId, username, profession, description }: SharePostParams) => {
      const professionSlug = makeProfessionSlug(profession);
      const url = `${window.location.origin}/user/${username}/${professionSlug}/post/${postId}`;

      const outcome = await shareContent({
        title: "Postare video",
        text: description || "Aruncă o privire peste această postare video",
        url,
      });

      if (outcome === "cancelled") return;
      trackShare(
        `/api/protected/posts/${postId}/shares`,
        channelFromOutcome(outcome)
      );
    },
    [shareContent]
  );

  return { sharePost, copiedSnackbarOpen, closeCopiedSnackbar };
};

type ShareBusinessProfileParams = {
  businessId: number;
  ownerUsername: string;
  profession: string;
  description?: string | null;
};

export const useShareBusinessProfile = () => {
  const { shareContent, copiedSnackbarOpen, closeCopiedSnackbar } =
    useShareContent();

  const shareBusinessProfile = useCallback(
    async ({
      businessId,
      ownerUsername,
      profession,
      description,
    }: ShareBusinessProfileParams) => {
      const url = `${window.location.origin}${AppRoutes.business(profession, ownerUsername)}`;

      const outcome = await shareContent({
        title: "Profilul afacerii",
        text: description || undefined,
        url,
      });

      if (outcome === "cancelled") return;
      trackShare(
        `/api/protected/businesses/${businessId}/share-profile`,
        channelFromOutcome(outcome)
      );
    },
    [shareContent]
  );

  return { shareBusinessProfile, copiedSnackbarOpen, closeCopiedSnackbar };
};
