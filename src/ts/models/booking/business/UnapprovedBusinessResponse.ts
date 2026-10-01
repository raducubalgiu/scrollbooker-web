export interface UnapprovedBusinessType {
  id: number;
  name: string;
}

export interface UnapprovedBusinessLocation {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}

export interface UnapprovedBusiness {
  id: number;
  has_employees: boolean;
  location: UnapprovedBusinessLocation;
  business_type: UnapprovedBusinessType;
}

export interface UnapprovedBusinessResponse {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
  business: UnapprovedBusiness;
}
