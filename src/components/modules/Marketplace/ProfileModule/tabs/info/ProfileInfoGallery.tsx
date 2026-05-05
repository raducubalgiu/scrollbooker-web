import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import { alpha, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import React from "react";

type ProfileInfoGalleryProps = {
  businessMedia: BusinessMediaFile[];
};

const ProfileInfoGallery = ({ businessMedia }: ProfileInfoGalleryProps) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="800" mb={2}>
        Galerie Foto
      </Typography>
      <Grid container spacing={2}>
        {businessMedia.length > 0 ? (
          businessMedia.map((img, idx) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={idx}>
              <Box sx={styles.imageContainer}>
                <Image
                  src={img.thumbnail_url ?? "/placeholder-image.jpg"}
                  alt={`Business media ${idx}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                <Box className="overlay" sx={styles.imageOverlay} />
              </Box>
            </Grid>
          ))
        ) : (
          <Box sx={styles.notFoundContainer}>
            <Typography variant="body2" color="text.secondary">
              Momentan nu există imagini în galeria acestui business.
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ProfileInfoGallery;

const styles = {
  imageContainer: {
    position: "relative",
    aspectRatio: "16 / 9",
    borderRadius: 4,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "grey.100",
    "&:hover img": {
      transform: "scale(1.08)",
    },
    "&:hover .overlay": {
      opacity: 1,
    },
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: alpha("#000", 0.1),
    opacity: 0,
    transition: "opacity 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundContainer: {
    width: "100%",
    p: 4,
    textAlign: "center",
    border: "2px dashed",
    borderColor: "divider",
    borderRadius: 4,
  },
};
