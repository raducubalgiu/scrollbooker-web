import { Box, Typography } from "@mui/material";
import Image from "next/image";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

type NearbyBusinessImageProps = {
  hasImage: boolean;
  url: string;
  username: string;
};

export default function NearbyBusinessImage({
  hasImage,
  url,
  username,
}: NearbyBusinessImageProps) {
  return (
    <Box sx={styles.imageContainer}>
      {hasImage ? (
        <Image
          src={url}
          alt={username}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          className="business-image"
          style={{
            objectFit: "cover",
            transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      ) : (
        <Box sx={styles.placeholderContainer}>
          <InsertPhotoOutlinedIcon sx={{ fontSize: 40, opacity: 0.7 }} />
          <Typography variant="body2" fontWeight={500}>
            Momentan nu există fotografii
          </Typography>
        </Box>
      )}
    </Box>
  );
}

const styles = {
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "1.4/1",
    borderRadius: 4,
    overflow: "hidden",
    bgcolor: "action.hover",
  },
  placeholderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 1,
    color: "text.disabled",
    p: 2,
    textAlign: "center",
  },
};
