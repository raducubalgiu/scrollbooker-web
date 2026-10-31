const BROWSERS: [RegExp, string][] = [
  [/Edg(A|iOS)?\//, "Edge"],
  [/OPR\/|Opera/, "Opera"],
  [/SamsungBrowser/, "Samsung Internet"],
  [/Firefox|FxiOS/, "Firefox"],
  [/Chrome|CriOS/, "Chrome"],
  [/Safari/, "Safari"],
];

const SYSTEMS: [RegExp, string][] = [
  [/iPhone|iPad|iPod/, "iOS"],
  [/Android/, "Android"],
  [/CrOS/, "ChromeOS"],
  [/Macintosh|Mac OS X/, "macOS"],
  [/Windows/, "Windows"],
  [/Linux/, "Linux"],
];

type DeviceHeaders = Record<string, string>;

const matchLabel = (userAgent: string, labels: [RegExp, string][]) =>
  labels.find(([pattern]) => pattern.test(userAgent))?.[1];

export function describeBrowser(userAgent: string): string | undefined {
  const browser = matchLabel(userAgent, BROWSERS);
  const system = matchLabel(userAgent, SYSTEMS);
  if (browser && system) return `${browser} (${system})`;
  return browser ?? system;
}

function baseDeviceHeaders(userAgent: string): DeviceHeaders {
  const result: DeviceHeaders = { "x-device-platform": "web" };
  const deviceName = describeBrowser(userAgent);
  if (deviceName) result["x-device-name"] = deviceName;
  return result;
}

export function deviceHeadersFromRequest(headers: Headers): DeviceHeaders {
  const userAgent = headers.get("user-agent") ?? "";
  const result = baseDeviceHeaders(userAgent);
  if (userAgent) result["user-agent"] = userAgent;

  const clientIp =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip");
  if (clientIp) result["x-forwarded-for"] = clientIp;

  return result;
}

export function browserDeviceHeaders(): DeviceHeaders {
  return baseDeviceHeaders(
    typeof navigator === "undefined" ? "" : navigator.userAgent
  );
}
