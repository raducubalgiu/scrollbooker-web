export type SearchHeaderStateType = {
  selectedBusinessDomainId: number | null;
  selectedServiceDomainId: number | null;
  selectedServiceId: number | null;
};

export type SearchHeaderActionsType = {
  onSetBusinessDomainId: (id: number | null) => void;
  onSetServiceDomainId: (id: number | null) => void;
  onSetServiceId: (id: number | null) => void;
};
