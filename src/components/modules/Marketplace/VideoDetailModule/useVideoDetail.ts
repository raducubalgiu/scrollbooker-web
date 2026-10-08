import { useCallback, useState } from "react";
import { AppRoutes } from "@/utils/routes";
import { Post } from "@/ts/models/social/Post";
import { getProfileRoute } from "../ProfileModule/tabs/profileTabsHelper";
import { useMutate } from "@/hooks/useHttp";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { usePostLikeBookmark } from "@/components/cutomized/Post/actions/usePostLikeBookmark";

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

	const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
		key: ["delete-post", post.id],
		url: `/api/social/post/${post.id}`,
		method: "DELETE",
		options: { onSuccess: () => goBack() },
	});

	const { mutate: follow, isPending: isFollowing } = useFollow();
	const { mutate: unfollow, isPending: isUnfollowing } = useUnfollow();

	const { handleLike, handleBookmark, isSavingLike, isSavingBookmark } =
		usePostLikeBookmark(post, (updater) => setPost(updater));

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
		isSavingLike,
		isSavingBookmark,
		handleFollow,
		isTogglingFollow: isFollowing || isUnfollowing,
		handleDelete: () => handleDelete({}),
		isPendingDelete,
		goBack,
	};
};
