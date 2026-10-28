import { track } from "@vercel/analytics";

export function trackRegisterCtaClick(location: string, destination: string) {
  track("register_cta_click", { location, destination });
}

export function trackLoginCtaClick(location: string) {
  track("login_cta_click", { location });
}
