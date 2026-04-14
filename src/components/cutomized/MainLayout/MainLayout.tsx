import { Box, Button, Stack, SxProps, Typography } from "@mui/material";

type MainLayoutProps = {
  title?: string;
  description?: string;
  actionTitle?: string;
  children: React.ReactNode;
  hideAction?: boolean;
  onOpenModal?: () => void;
  sx?: SxProps;
};

export default function MainLayout({
  title,
  description,
  actionTitle,
  children,
  hideAction = false,
  onOpenModal,
  sx = {},
}: MainLayoutProps) {
  return (
    <Box sx={sx}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography fontWeight={600} variant="h4">
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
        {!hideAction && (
          <Button onClick={onOpenModal} variant="contained" color="primary">
            {!!actionTitle ? actionTitle : "Adaugă"}
          </Button>
        )}
      </Stack>
      {children}
    </Box>
  );
}
