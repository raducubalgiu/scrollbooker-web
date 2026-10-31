import type { SvgIconComponent } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { AppRoutes } from "@/utils/routes";

export type SettingsNavItem = {
  title: string;
  href: string;
  icon: SvgIconComponent;
};

export type SettingsNavSection = {
  title: string;
  items: SettingsNavItem[];
};

export const SETTINGS_NAV_SECTIONS: SettingsNavSection[] = [
  {
    title: "Cont",
    items: [
      {
        title: "Informații cont",
        href: AppRoutes.accountInfo(),
        icon: BadgeOutlinedIcon,
      },
      {
        title: "Parolă",
        href: AppRoutes.accountPassword(),
        icon: LockOutlinedIcon,
      },
      {
        title: "Dispozitive conectate",
        href: AppRoutes.accountConnectedDevices(),
        icon: DevicesOutlinedIcon,
      },
      {
        title: "Dezactivează sau șterge contul",
        href: AppRoutes.deactivateDeleteAccount(),
        icon: PersonOffOutlinedIcon,
      },
    ],
  },
  {
    title: "Preferințe",
    items: [
      {
        title: "Afișare",
        href: AppRoutes.display(),
        icon: BedtimeOutlinedIcon,
      },
    ],
  },
  {
    title: "Suport",
    items: [
      {
        title: "Raportează o problemă",
        href: AppRoutes.reportProblem(),
        icon: FlagOutlinedIcon,
      },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  [AppRoutes.settings()]: "Setări",
  [AppRoutes.account()]: "Cont",
  [AppRoutes.accountInfo()]: "Informații cont",
  [AppRoutes.accountInfoPhoneVerification()]: "Verifică numărul de telefon",
  [AppRoutes.accountPassword()]: "Parolă",
  [AppRoutes.accountConnectedDevices()]: "Dispozitive conectate",
  [AppRoutes.deactivateDeleteAccount()]: "Dezactivează sau șterge contul",
  [AppRoutes.deleteAccount()]: "Șterge contul permanent",
  [AppRoutes.display()]: "Afișare",
  [AppRoutes.reportProblem()]: "Raportează o problemă",
};

export function getSettingsPageTitle(pathname: string) {
  return PAGE_TITLES[pathname.replace(/\/$/, "")] ?? "Setări";
}

export function getActiveSettingsHref(pathname: string) {
  const hrefs = SETTINGS_NAV_SECTIONS.flatMap((section) =>
    section.items.map((item) => item.href),
  );

  return hrefs
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];
}
