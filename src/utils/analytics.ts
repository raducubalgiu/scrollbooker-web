import { track } from "@vercel/analytics";

export function trackUserSubscribeToLaunch() {
  track("user_subscribe_to_launch");
}

export function trackRegisterCtaClick(location: string, destination: string) {
  track("register_cta_click", { location, destination });
}

export function trackBusinessLeadSubmitted(
  businessDomain: string,
  hasCity: boolean
) {
  track("business_lead_submitted", {
    business_domain: businessDomain,
    has_city: hasCity,
  });
}

export function trackBusinessLeadError() {
  track("business_lead_error");
}
