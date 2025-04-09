export type UserInfoType = {
	id: number;
	fullname: string;
	username: string;
	avatar: string;
	business_id: number;
	profession: string;
	counters: {
		followers_count: number;
		followings_count: number;
		ratings_count: number;
		ratings_average: number;
	};
};
