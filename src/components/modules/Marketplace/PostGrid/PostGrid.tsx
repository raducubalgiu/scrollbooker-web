"use client";

import React from "react";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";

type PostMock = {
  id: number;
  author: string;
  username: string;
  title: string;
  likes: number;
  comments: number;
  shares: number;
  seed: string; // for picsum
};

const generateMockPosts = (count = 20): PostMock[] =>
  Array.from({ length: count }).map((_, i) => {
    const id = i + 1;
    return {
      id,
      author: `User ${id}`,
      username: `user${id}`,
      title: `Postare demo #${id}`,
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 1200),
      shares: Math.floor(Math.random() * 800),
      seed: `post-${id}`,
    };
  });

const PostCard: React.FC<{ post: PostMock }> = ({ post }) => {
  const imgUrl = `https://picsum.photos/seed/${post.seed}/400/711`; // 9:16-ish

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
        //boxShadow: 1,
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "9/12",
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
};

const PostGrid: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const posts = React.useMemo(() => generateMockPosts(count), [count]);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {posts.map((p) => (
          <Grid
            item
            key={p.id}
            xs={12}
            sm={6}
            md={4}
            lg={2}
            xl={2}
            sx={{ display: "flex" }}
          >
            <PostCard post={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PostGrid;
