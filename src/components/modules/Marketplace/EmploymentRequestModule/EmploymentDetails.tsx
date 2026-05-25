import { UserMini } from "@/ts/models/user/UserMini";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import React from "react";

type EmploymentDetailsProps = {
  employer: UserMini;
};

const EmploymentDetails = ({ employer }: EmploymentDetailsProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={{ display: "inline-block", mb: 3 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          color="primary"
          badgeContent={
            <RepeatIcon sx={{ fontSize: "1.1rem", color: "white" }} />
          }
          sx={styles.badge}
        >
          <Avatar
            alt={employer.fullname}
            src={employer.avatar ?? ""}
            sx={styles.avatar}
          />
        </Badge>
      </Box>

      <Typography variant="body1" fontWeight={800}>
        {employer.fullname} ți-a trimis o cerere de angajare.
      </Typography>
    </Box>
  );
};

export default EmploymentDetails;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
  },
  badge: {
    "& .MuiBadge-badge": {
      width: 32,
      height: 32,
      borderRadius: "50%",
      minWidth: "unset",
      boxShadow: "0 0 0 3px white",
    },
  },
  avatar: {
    width: 100,
    height: 100,
    border: 1,
    borderColor: "divider",
  },
};
