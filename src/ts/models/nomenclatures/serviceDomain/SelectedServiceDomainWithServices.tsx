export type SelectedServiceDomainWithServices = {
  id: number;
  name: string;
  services: SelectedService[];
};

export type SelectedService = {
  id: number;
  name: string;
  short_name: string;
  is_selected: boolean;
};
