import { Box, Button, SxProps, Typography } from "@mui/material";
import CustomStack from "../../core/CustomStack/CustomStack";

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
  sx,
}: MainLayoutProps) {
  return (
    <Box sx={sx}>
      <CustomStack sx={{ mb: 2.5 }}>
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
      </CustomStack>
      {children}
    </Box>
  );
}
