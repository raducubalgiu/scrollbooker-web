export enum SearchHeaderSectionEnum {
  Services = "services",
  Location = "location",
  Datetime = "datetime",
}

export const SEARCH_HEADER_SECTIONS = [
  {
    key: SearchHeaderSectionEnum.Services,
    title: "Serviciu",
    value: "Toate serviciile",
  },
  {
    key: SearchHeaderSectionEnum.Location,
    title: "Locație",
    value: "În apropiere",
  },
  {
    key: SearchHeaderSectionEnum.Datetime,
    title: "Data & Ora",
    value: "Oricând",
  },
] as const;

export type SearchHeaderSectionType =
  (typeof SEARCH_HEADER_SECTIONS)[number]["key"];
