import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const POSTS_PATH = "/api/protected/posts";

export const useLikePost = () => {
  return useMutation({
    mutationFn: (postId: number) => axios.post(`${POSTS_PATH}/${postId}/likes`),
  });
};

export const useUnlikePost = () => {
  return useMutation({
    mutationFn: (postId: number) =>
      axios.delete(`${POSTS_PATH}/${postId}/likes`),
  });
};
