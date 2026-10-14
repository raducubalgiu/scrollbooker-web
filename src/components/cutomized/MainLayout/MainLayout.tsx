import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";

type MainLayoutProps = {
  title?: string;
  description?: string;
  actionTitle?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  hideAction?: boolean;
  onOpenModal?: () => void;
  sx?: SxProps<Theme>;
};

export default function MainLayout({
  title,
  description,
  actionTitle,
  children,
  showHeader = true,
  hideAction = false,
  onOpenModal,
  sx = {},
}: MainLayoutProps) {
  const hasBothTitleAndDesc = !!(title?.trim() && description?.trim());
  const hasMobileHeaderContent = hasBothTitleAndDesc || !hideAction;

  return (
    <Box sx={styles.container}>
      <HeaderMobile title={!hasBothTitleAndDesc ? title : undefined} />

      <Box sx={styles.main}>
        <Box sx={[{ p: 2.5 }, ...(Array.isArray(sx) ? sx : [sx])]}>
          {showHeader && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                mb: { xs: hasMobileHeaderContent ? 2.5 : 0, lg: 2.5 },
              }}
            >
              <Box>
                <Typography
                  fontWeight={700}
                  variant="h4"
                  sx={
                    !hasBothTitleAndDesc
                      ? { display: { xs: "none", lg: "block" } }
                      : {}
                  }
                >
                  {title}
                </Typography>

                {description && (
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                )}
              </Box>

              {!hideAction && (
                <Button
                  onClick={onOpenModal}
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  {!!actionTitle ? actionTitle : "Adaugă"}
                </Button>
              )}
            </Stack>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  main: {
    flexGrow: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorY: "contain",
  },
};
