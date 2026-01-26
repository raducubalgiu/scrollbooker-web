import { Box, Button, SxProps, Typography } from "@mui/material";
import CustomStack from "../../core/CustomStack/CustomStack";

type MainLayoutProps = {
  title?: string;
  actionTitle?: string;
  children: React.ReactNode;
  hideAction?: boolean;
  onOpenModal?: () => void;
  sx?: SxProps;
};

export default function MainLayout({
  title,
  actionTitle,
  children,
  hideAction = false,
  onOpenModal,
  sx,
}: MainLayoutProps) {
  return (
    <Box sx={sx}>
      <CustomStack sx={{ mb: 2.5 }}>
        <Typography sx={{ fontWeight: "600" }} variant="h5">
          {title}
        </Typography>
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
