import { Box, SxProps, Theme } from "@mui/material";
import { StaticImageData } from "next/image";

type CustomSvgProps = {
  src: StaticImageData | string;
  size?: number;
  sx?: SxProps<Theme>;
};

const CustomSvg = ({ src, size = 24, sx }: CustomSvgProps) => {
  const url = typeof src === "string" ? src : src.src;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: "currentColor",
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        ...sx,
      }}
    />
  );
};

export default CustomSvg;
