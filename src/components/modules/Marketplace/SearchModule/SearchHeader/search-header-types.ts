export type SearchHeaderStateType = {
  selectedBusinessDomainId: number | null;
  selectedServiceDomainId: number | null;
  selectedServiceId: number | null;
  selectedSubFilterIds: number[];
  startDate: string | null; // Salvare în format ISO string 'YYYY-MM-DD'
  startTime: string | null; // Salvare în format 'HH:mm'
  endTime: string | null; // Salvare în format 'HH:mm'
};

export type SearchHeaderActionsType = {
  onSetBusinessDomainId: (id: number | null) => void;
  onSetServiceDomainId: (id: number | null) => void;
  onSetServiceId: (id: number | null) => void;
  onSetSubFilterIds: (ids: number[]) => void;
  onSetDateTime: (dateTime: {
    startDate: string | null;
    startTime: string | null;
    endTime: string | null;
  }) => void;
  onExecuteSearch: (partialState: Partial<SearchHeaderStateType>) => void;
};
