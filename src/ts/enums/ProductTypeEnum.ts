export enum ProductTypeEnum {
  SINGLE = "single",
  PACK = "pack",
  MEMBERSHIP = "membership",
}

export function fromKey(key: string): ProductTypeEnum | null {
  return Object.values(ProductTypeEnum).includes(key as ProductTypeEnum)
    ? (key as ProductTypeEnum)
    : null;
}

export function fromKeys(keys: string[]): ProductTypeEnum[] {
  return keys.map(fromKey).filter((key): key is ProductTypeEnum => key != null);
}

export function getProductTypeLabel(
  type: ProductTypeEnum | string | null | undefined
): string {
  const key = (type ?? "").toString().toLowerCase();
  switch (key) {
    case ProductTypeEnum.SINGLE:
      return "Single";
    case ProductTypeEnum.PACK:
      return "Pachet de ședințe";
    case ProductTypeEnum.MEMBERSHIP:
      return "Abonament";
    default:
      return key ? key.charAt(0).toUpperCase() + key.slice(1) : "";
  }
}

export namespace ProductTypeEnum {
  export const all: ProductTypeEnum[] = Object.values(ProductTypeEnum).filter(
    (v): v is ProductTypeEnum => typeof v === "string"
  );
}
