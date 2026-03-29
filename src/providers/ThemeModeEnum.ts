export enum ThemeModeEnum {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

export namespace ThemeModeEnum {
  export const all: ThemeModeEnum[] = Object.values(ThemeModeEnum).filter(
    (v): v is ThemeModeEnum => typeof v === "string"
  );
}
