import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ReviewsContent from "@/components/modules/Marketplace/SocialModule/reviews/ReviewsContent";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";

type PostReviewsSheetProps = {
  open: boolean;
  onClose: () => void;
  businessId: number | null;
  employeeId: number | null;
  isLoadingPosts: boolean;
};

const PostReviewsSheet = ({
  open,
  onClose,
  businessId,
  employeeId,
  isLoadingPosts,
}: PostReviewsSheetProps) => {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", lg: "none" } }}
      slotProps={{
        paper: { sx: styles.drawer },
      }}
    >
      <Box sx={styles.container}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={2}
          minHeight={30}
        >
          <Typography fontWeight={800} fontSize={16}>
            Recenzii
          </Typography>

          <IconButton onClick={onClose} size="small" sx={styles.iconBack}>
            <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={styles.listContainer} ref={scrollRootRef}>
        {!isLoadingPosts && businessId && (
          <ReviewsContent
            businessId={businessId}
            employeeId={employeeId}
            rootRef={scrollRootRef}
          />
        )}

        {!isLoadingPosts && !businessId && (
          <NotFound
            compact
            title="Recenzii"
            description="Nu au fost găsite recenzii"
            icon={<ReviewsOutlinedIcon />}
          />
        )}
      </Box>
    </Drawer>
  );
};

export default PostReviewsSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "80vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    pt: 2,
    pb: 1.5,
    borderBottom: 1,
    borderColor: "divider",
    flexShrink: 0,
  },
  iconBack: {
    position: "absolute",
    right: 0,
    color: "text.secondary",
  },
  listContainer: {
    flexGrow: 1,
    overflowY: "auto",
    px: 0.5,
    WebkitOverflowScrolling: "touch",
  },
};
