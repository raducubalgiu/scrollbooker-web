import React from "react";
import { Product } from "@/ts/models/booking/product/Product";
import { Box, Button, Divider, Stack } from "@mui/material";
import UploadVideoDescription from "./UploadVideoDescription";
import UploadVideoProducts from "./UploadVideoProducts";

type UploadVideoSidebarProps = {
  description: string;
  selectedProducts: Product[];
  onDescriptionChange: (d: string) => void;
  onHandleOpenProducts: () => void;
  onHandleUpload: () => void;
  isDisabled: boolean;
};

const UploadVideoSidebar = ({
  description,
  selectedProducts,
  onHandleOpenProducts,
  onDescriptionChange,
  onHandleUpload,
  isDisabled,
}: UploadVideoSidebarProps) => {
  return (
    <Box flex={1} sx={styles.container}>
      <Stack sx={{ height: "100%" }}>
        <Box sx={styles.contentContainer}>
          <Box sx={styles.content}>
            <UploadVideoDescription
              description={description}
              onDescriptionChange={onDescriptionChange}
            />

            <UploadVideoProducts
              selectedProducts={selectedProducts}
              onOpenProducts={onHandleOpenProducts}
            />
          </Box>
        </Box>

        <Box sx={{ p: 2.5, pt: 0, zIndex: 10, bgcolor: "background.paper" }}>
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <Button
            onClick={onHandleUpload}
            variant="contained"
            fullWidth
            disableElevation
            disabled={isDisabled}
            sx={{
              p: 1.8,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Postează
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default UploadVideoSidebar;

const styles = {
  container: {
    maxWidth: 600,
    border: 1,
    borderColor: "divider",
    borderRadius: 4,
    height: "100%",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    px: 2.5,
    py: 1,
  },
  content: {
    height: "100%",
    width: "calc(100% - 40px)",
    position: "absolute",
    top: 0,
    pt: 2.5,
  },
};
