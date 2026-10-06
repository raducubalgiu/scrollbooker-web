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
  return (
    <Box sx={styles.container}>
      <HeaderMobile />

      <Box sx={styles.main}>
        <Box sx={{ p: 2.5, ...sx }}>
          {showHeader && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <Box>
                <Typography fontWeight={700} variant="h4">
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
