export interface SelectedServiceDomainWithServices {
  id: number;
  name: string;
  services: SelectedService[];
}

export interface SelectedService {
  id: number;
  name: string;
  short_name: string;
  is_selected: boolean;
}
