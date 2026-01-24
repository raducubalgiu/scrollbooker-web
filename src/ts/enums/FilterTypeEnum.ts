export enum FilterTypeEnum {
  OPTIONS = "options",
  NUMERIC = "numeric",
  RANGE = "range",
}

// Conversion from String
export function filterTypefromKey(key: string): FilterTypeEnum | null {
  return Object.values(FilterTypeEnum).includes(key as FilterTypeEnum)
    ? (key as FilterTypeEnum)
    : null;
}

// Conversion from List
export function filterTypefromKeys(keys: string[]): FilterTypeEnum[] {
  return keys
    .map(filterTypefromKey)
    .filter((key): key is FilterTypeEnum => key != null);
}
