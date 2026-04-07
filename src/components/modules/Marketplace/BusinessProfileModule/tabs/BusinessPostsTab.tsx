import { Post } from "@/ts/models/social/Post";
import { Box, Stack, Typography } from "@mui/material";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import React, { memo } from "react";
import Image from "next/image";
import { formatViews } from "@/components/cutomized/PostGrid/PostGrid";
import Link from "next/link";

type BusinessPostsTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  posts: Post[];
};

const BusinessPostsTab = ({ id, innerRef, posts }: BusinessPostsTabProps) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: {
        xs: 0,
        md: 2,
      },
      pt: {
        xs: 0,
        md: 2,
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(4, 1fr)",
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
    <Box
      id={id}
      ref={innerRef}
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Postări video
      </Typography>

      <Box sx={styles.container}>
        <Box sx={styles.grid}>
          {posts.map((post) => (
            <Box
              component={Link}
              key={post.id}
              href={`/post/${post.id}`}
              sx={{ width: "100%", display: "block" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "background.default",
                  aspectRatio: "9/12",
                }}
              >
                <Image
                  src={post.media_files[0]?.thumbnail_url || "/placeholder.jpg"}
                  alt="Post thumbnail"
                  fill
                  sizes="(max-width: 600px) 33vw, (max-width: 900px) 25vw, 20vw"
                  style={{
                    objectFit: "cover",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 60%)",
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 6,
                    left: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    pointerEvents: "none",
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <PlayArrowOutlinedIcon
                      sx={{ color: "#fff", fontSize: 30 }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: { xs: 12, sm: 18 },
                        textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                      }}
                    >
                      {formatViews(post.counters.views_count)}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(BusinessPostsTab);
