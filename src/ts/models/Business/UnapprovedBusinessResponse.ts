
export type UnapprovedResponse = {
    id: number,
    username: string,
    fullname: string,
    avatar: string,
    business: UnapprovedBusinessResponse
}

export type UnapprovedBusinessResponse = {
    id: number,
    has_employees: boolean,
    location: {
        coordinates: {
            lat: string,
            lng: string
        },
        address: string
    },
    business_type: {
        id: number,
        name: string
    }
}