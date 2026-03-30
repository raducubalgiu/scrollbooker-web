export interface PostComment {
  id: number;
  text: string;
  parent_id: number | null;
  user: CommentUser;
  post_id: number;
  like_count: number;
  is_liked: boolean;
  liked_by_post_author: boolean;
  replies_count: number;
  created_at: string;
}

export interface CommentUser {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
}

export interface PostCommentCreate {
  text: string;
  parent_id?: number | null;
  post_id: number;
}
