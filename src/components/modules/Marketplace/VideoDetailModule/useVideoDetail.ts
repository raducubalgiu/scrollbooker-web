import { useCallback, useState } from "react";
import { AppRoutes } from "@/utils/routes";
import { Post } from "@/ts/models/social/Post";
import { getProfileRoute } from "../ProfileModule/tabs/profileTabsHelper";
import { useMutate } from "@/hooks/useHttp";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type UseVideoDetailProps = {
	initialPost: Post;
	username: string;
	profession: string;
	tab?: string | null;
};

export const useVideoDetail = ({
	initialPost,
	username,
	profession,
	tab,
}: UseVideoDetailProps) => {
	const [post, setPost] = useState<Post>(initialPost);
	const { navigateTo, goBack } = useAppNavigation();

	const handleClose = useCallback(() => {
		if (!tab) {
			goBack();
			return;
		}
		const targetTabEnum = getProfileRoute(tab);
		navigateTo(AppRoutes.profile(username, profession, targetTabEnum), {
			replace: true,
		});
	}, [navigateTo, goBack, tab, username, profession]);

	const { mutate: apiLike } = useMutate({
		key: ["like-post", post.id],
		method: "POST",
		url: `/api/social/post/like`,
	});
	const { mutate: apiUnlike } = useMutate({
		key: ["unlike-post", post.id],
		method: "DELETE",
		url: `/api/social/post/like`,
	});
	const { mutate: apiBookmark } = useMutate({
		key: ["bookmark-post", post.id],
		method: "POST",
		url: `/api/social/post/bookmark`,
	});
	const { mutate: apiUnbookmark } = useMutate({
		key: ["unbookmark-post", post.id],
		method: "DELETE",
		url: `/api/social/post/bookmark`,
	});

	const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
		key: ["delete-post", post.id],
		url: `/api/social/post/${post.id}`,
		method: "DELETE",
		options: { onSuccess: () => goBack() },
	});

	const { mutate: follow, isPending: isFollowing } = useFollow();
	const { mutate: unfollow, isPending: isUnfollowing } = useUnfollow();

	const updatePostState = useCallback(
		(type: "is_liked" | "is_bookmarked", action: "increment" | "decrement") => {
			const counterKey = type === "is_liked" ? "like_count" : "bookmark_count";
			const change = action === "increment" ? 1 : -1;

			setPost(prev => ({
				...prev,
				counters: {
					...prev.counters,
					[counterKey]: Math.max(0, prev.counters[counterKey] + change),
				},
				user_actions: {
					...prev.user_actions,
					[type]: action === "increment",
				},
			}));
		},
		[],
	);

	// 3. Handler pentru Like
	const handleLike = useCallback(() => {
		const isLiked = post.user_actions.is_liked;

		// Pas 1: Update optimist în UI
		updatePostState("is_liked", isLiked ? "decrement" : "increment");

		// Pas 2: Apel API cu rollback pe eroare
		const triggerApi = isLiked ? apiUnlike : apiLike;
		triggerApi(
			{ post_id: post.id },
			{
				onError: () =>
					updatePostState("is_liked", isLiked ? "increment" : "decrement"),
			},
		);
	}, [
		post.id,
		post.user_actions.is_liked,
		apiLike,
		apiUnlike,
		updatePostState,
	]);

	const handleBookmark = useCallback(() => {
		const isBookmarked = post.user_actions.is_bookmarked;

		updatePostState("is_bookmarked", isBookmarked ? "decrement" : "increment");

		const triggerApi = isBookmarked ? apiUnbookmark : apiBookmark;
		triggerApi(
			{ post_id: post.id },
			{
				onError: () =>
					updatePostState(
						"is_bookmarked",
						isBookmarked ? "increment" : "decrement",
					),
			},
		);
	}, [
		post.id,
		post.user_actions.is_bookmarked,
		apiBookmark,
		apiUnbookmark,
		updatePostState,
	]);

	const handleFollow = useCallback(() => {
		const wasFollowing = post.user.is_follow;

		setPost(prev => ({
			...prev,
			user: { ...prev.user, is_follow: !wasFollowing },
		}));

		const mutate = wasFollowing ? unfollow : follow;
		mutate(post.user.id, {
			onError: () =>
				setPost(prev => ({
					...prev,
					user: { ...prev.user, is_follow: wasFollowing },
				})),
		});
	}, [post.user.id, post.user.is_follow, follow, unfollow]);

	return {
		post,
		handleClose,
		handleLike,
		handleBookmark,
		handleFollow,
		isTogglingFollow: isFollowing || isUnfollowing,
		handleDelete: () => handleDelete({}),
		isPendingDelete,
		goBack,
	};
};
