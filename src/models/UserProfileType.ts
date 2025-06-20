export type UserProfileType = {
    id: number,
    username: string,
    fullname: string,
    avatar?: string,
    gender: string,
    bio?: string,
    business_id?: number,
    business_type_id?: number,
    counters: UserCountersType,
    profession: string,
    opening_hours: OpeningHours,
    is_follow: boolean,
    business_owner?: BusinessOwnerType
}

type UserCountersType = {
    user_id: number,
    followings_count: number,
    followers_count: number,
    products_count: number,
    posts_count: number,
    ratings_count: number,
    ratings_average: number
}

type OpeningHours = {
    open_now: boolean,
    closing_time?: string,
    next_open_day?: string,
    next_open_time?: string
}

type BusinessOwnerType = {
    id: number,
    fullname: string,
    username: string,
    avatar?: string,
    is_follow: boolean
}