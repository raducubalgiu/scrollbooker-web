import React from "react";
import { Box, Typography } from "@mui/material";

type LegalSectionProps = {
  title: string;
  paragraphs?: string[];
  children?: React.ReactNode;
};

const LegalSection = ({ title, paragraphs, children }: LegalSectionProps) => {
  return (
    <Box component="section" sx={styles.section}>
      <Typography variant="h3" sx={styles.title}>
        {title}
      </Typography>
      {paragraphs?.map((paragraph) => (
        <Typography key={paragraph} sx={styles.paragraph}>
          {paragraph}
        </Typography>
      ))}
      {children}
    </Box>
  );
};

export default LegalSection;

const styles = {
  section: {
    mb: { xs: 5, md: 6 },
  },
  title: {
    fontWeight: 700,
    mb: 2,
  },
  paragraph: {
    color: "text.secondary",
    lineHeight: 1.75,
    mb: 1.5,
  },
};
