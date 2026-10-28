import { keyframes } from "@mui/material";

export const floatKeyframes = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const fadeUpKeyframes = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const marqueeKeyframes = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export function motionSafe(animation: string) {
  return {
    "@media (prefers-reduced-motion: no-preference)": { animation },
  };
}
