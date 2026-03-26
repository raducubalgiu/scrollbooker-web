import { Box } from "@mui/material";
import React from "react";

type PostGridContainerProps = {
  children: React.ReactNode;
};

const PostGridContainer = ({ children }: PostGridContainerProps) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: {
        xs: 0,
        md: 2,
      },
      px: {
        xs: 0,
        md: 2,
      },
      pt: {
        xs: 0,
        md: 2,
      },
      pb: {
        xs: 0,
        md: 2,
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(3, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(6, 1fr)",
        xl: "repeat(6, 1fr)",
      },
      gap: {
        xs: "2px",
        sm: "4px",
        md: 2,
        lg: 2.5,
      },
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.grid}>{children}</Box>
    </Box>
  );
};

export default PostGridContainer;
