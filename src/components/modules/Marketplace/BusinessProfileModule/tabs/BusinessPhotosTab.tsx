import React, { memo } from "react";
import BusinessProfileGallery from "../BusinessGallery";
import { Box } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";

type BusinessPhotosTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  mediaFiles?: BusinessMediaFile[];
};

const BusinessPhotosTab = ({
  id,
  innerRef,
  mediaFiles,
}: BusinessPhotosTabProps) => {
  return (
    <Box id={id} ref={innerRef}>
      <BusinessProfileGallery mediaFiles={mediaFiles || []} />
    </Box>
  );
};

export default memo(BusinessPhotosTab);
