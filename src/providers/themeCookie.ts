"use server";

import { cookies } from "next/headers";
import { ThemeModeEnum } from "./ThemeModeEnum";

const THEME_COOKIE_NAME = "sb-ui-color-mode";
const SYSTEM_THEME_COOKIE_NAME = "sb-ui-system-theme";

function isThemeModeEnum(value: string | undefined): value is ThemeModeEnum {
  return (
    value === ThemeModeEnum.LIGHT ||
    value === ThemeModeEnum.DARK ||
    value === ThemeModeEnum.SYSTEM
  );
}

function isResolvedTheme(
  value: string | undefined
): value is ThemeModeEnum.LIGHT | ThemeModeEnum.DARK {
  return value === ThemeModeEnum.LIGHT || value === ThemeModeEnum.DARK;
}

export async function getThemeMode(): Promise<ThemeModeEnum> {
  const cookieStore = await cookies();
  const value = cookieStore.get(THEME_COOKIE_NAME)?.value;

  return isThemeModeEnum(value) ? value : ThemeModeEnum.SYSTEM;
}

export async function setThemeMode(mode: ThemeModeEnum) {
  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE_NAME, mode, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function getSystemThemeGuess(): Promise<
  ThemeModeEnum.LIGHT | ThemeModeEnum.DARK
> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SYSTEM_THEME_COOKIE_NAME)?.value;

  return isResolvedTheme(value) ? value : ThemeModeEnum.LIGHT;
}

export async function setSystemThemeGuess(
  resolved: ThemeModeEnum.LIGHT | ThemeModeEnum.DARK
) {
  const cookieStore = await cookies();
  cookieStore.set(SYSTEM_THEME_COOKIE_NAME, resolved, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
