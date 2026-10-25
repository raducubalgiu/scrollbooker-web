import { useCallback, useState } from "react";
import { LOG } from "@/utils/logger";

export type ShareOutcome = "shared" | "copied" | "cancelled";

type ShareContentParams = {
  title: string;
  text?: string | undefined;
  url: string;
};

export const useShareContent = () => {
  const [copiedSnackbarOpen, setCopiedSnackbarOpen] = useState(false);

  const shareContent = useCallback(
    async ({
      title,
      text,
      url,
    }: ShareContentParams): Promise<ShareOutcome> => {
      const shareData: ShareData = { title, url, ...(text ? { text } : {}) };

      if (
        navigator.share &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        try {
          await navigator.share(shareData);
          return "shared";
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return "cancelled";
          }
          LOG.error(
            `Web Share API a eșuat: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      try {
        await navigator.clipboard.writeText(url);
        setCopiedSnackbarOpen(true);
        return "copied";
      } catch (error) {
        LOG.error(
          `Copierea în clipboard a eșuat: ${error instanceof Error ? error.message : String(error)}`
        );
      }

      try {
        window.prompt(
          "Copierea automată nu este permisă de browser. Copiază link-ul de mai jos:",
          url
        );
      } catch (fallbackError) {
        LOG.error(
          `Eșec total la orice metodă de partajare/copiere: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`
        );
      }

      return "cancelled";
    },
    []
  );

  return {
    shareContent,
    copiedSnackbarOpen,
    closeCopiedSnackbar: () => setCopiedSnackbarOpen(false),
  };
};
