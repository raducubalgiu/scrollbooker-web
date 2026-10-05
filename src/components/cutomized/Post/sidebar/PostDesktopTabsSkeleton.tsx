import { memo } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

const TAB_PLACEHOLDERS = [0, 1, 2] as const;
const ROW_PLACEHOLDERS = [0, 1, 2, 3] as const;

const PostDesktopTabsSkeleton = () => (
  <>
    <Box sx={styles.tabsRow} aria-hidden>
      {TAB_PLACEHOLDERS.map((key) => (
        <Box key={key} sx={styles.tab}>
          <Skeleton variant="text" width="60%" sx={{ fontSize: 14.5 }} />
        </Box>
      ))}
    </Box>

    <Box sx={styles.content} aria-busy="true" aria-live="polite">
      <Stack spacing={2.5} sx={{ p: 3 }} aria-hidden>
        {ROW_PLACEHOLDERS.map((key) => (
          <Stack key={key} direction="row" spacing={1.5} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  </>
);

export default memo(PostDesktopTabsSkeleton);

const styles = {
  tabsRow: {
    display: "flex",
    borderBottom: 1,
    borderColor: "divider",
  },
  tab: {
    flex: 1,
    minWidth: 0,
    px: 1,
    py: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  },
} satisfies Record<string, SxProps<Theme>>;
