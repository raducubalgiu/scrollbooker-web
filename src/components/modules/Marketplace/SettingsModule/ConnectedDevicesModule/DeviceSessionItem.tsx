"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import dayjs from "@/lib/dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  UserSession,
  UserSessionPlatform,
} from "@/ts/models/auth/UserSession";

dayjs.extend(relativeTime);

const PLATFORM_ICONS: Record<UserSessionPlatform, SvgIconComponent> = {
  ios: PhoneIphoneOutlinedIcon,
  android: PhoneAndroidOutlinedIcon,
  web: LaptopOutlinedIcon,
  unknown: DevicesOtherOutlinedIcon,
};

const PLATFORM_LABELS: Record<UserSessionPlatform, string> = {
  ios: "Aplicația iOS",
  android: "Aplicația Android",
  web: "Browser web",
  unknown: "Dispozitiv necunoscut",
};

type DeviceSessionItemProps = {
  session: UserSession;
  action?: React.ReactNode;
};

const DeviceSessionItem = ({ session, action }: DeviceSessionItemProps) => {
  const Icon = PLATFORM_ICONS[session.platform] ?? DevicesOtherOutlinedIcon;
  const title = session.device_name || PLATFORM_LABELS[session.platform];
  const details = [
    session.device_name ? PLATFORM_LABELS[session.platform] : null,
    session.app_version ? `v${session.app_version}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Box sx={styles.card}>
      <Box sx={styles.iconBox}>
        <Icon sx={{ color: "text.secondary" }} />
      </Box>

      <Stack sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontWeight={600} noWrap>
          {title}
        </Typography>
        {details && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {details}
          </Typography>
        )}
        {session.is_current ? (
          <Typography variant="body2" fontWeight={600} color="success.main">
            Acest dispozitiv
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Activ {dayjs(session.last_used_at).fromNow()}
          </Typography>
        )}
      </Stack>

      {action}
    </Box>
  );
};

export default DeviceSessionItem;

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 2,
    bgcolor: "background.default",
    border: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};
