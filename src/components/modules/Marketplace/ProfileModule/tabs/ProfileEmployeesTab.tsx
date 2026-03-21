import React, { memo } from "react";
import { Box } from "@mui/material";
import UserItem from "@/components/cutomized/UserItem/UserItem";
import { UserMiniType } from "@/ts/models/user/UserMiniType";

const employees: UserMiniType[] = [
  {
    id: 1,
    fullname: "Raducu Balgiu",
    username: "@raducubalgiu",
    is_business_or_employee: true,
    profession: "Stylist",
    ratings_average: 4.5,
    avatar: "/static/images/avatar/2.jpg",
  },
  {
    id: 2,
    fullname: "Maria Popescu",
    username: "@mariapopescu",
    is_business_or_employee: true,
    profession: "Makeup Artist",
    ratings_average: 4.8,
    avatar: "/static/images/avatar/3.jpg",
  },
  {
    id: 3,
    fullname: "Andrei Ionescu",
    username: "@andreionescu",
    is_business_or_employee: true,
    profession: "Barber",
    ratings_average: 4.2,
    avatar: "/static/images/avatar/4.jpg",
  },
];

const ProfileEmployeesTab = () => {
  return (
    <Box sx={{ maxWidth: "md" }}>
      {employees.map((employee) => (
        <UserItem user={employee} />
      ))}
    </Box>
  );
};

export default memo(ProfileEmployeesTab);
