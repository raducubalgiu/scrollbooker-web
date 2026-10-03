import React, { memo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { CalendarEventsBusinessEmployee } from "@/ts/models/booking/availability/CalendarEvents";
import { EMPLOYEE_COLUMN_MIN_WIDTH } from "./employeesDayCalendarConstants";
import { getCalendarTableBg } from "../calendarSurfaceColors";

type EmployeesDayCalendarColumnsHeaderProps = {
  employees: CalendarEventsBusinessEmployee[];
  scrollRef: React.Ref<HTMLDivElement>;
};

const EmployeesDayCalendarColumnsHeaderComponent = ({
  employees,
  scrollRef,
}: EmployeesDayCalendarColumnsHeaderProps) => {
  return (
    <Box
      ref={scrollRef}
      sx={{
        ...styles.container,
        gridTemplateColumns: `90px repeat(${employees.length}, minmax(${EMPLOYEE_COLUMN_MIN_WIDTH}px, 1fr))`,
      }}
    >
      <Box sx={styles.grid} />
      {employees.map((employee, index) => (
        <Box
          key={employee.id}
          sx={{
            gridColumn: index + 2,
            ...styles.employee,
          }}
        >
          <Avatar src={employee.avatar ?? ""} sx={styles.avatar} />
          <Typography variant="subtitle2" noWrap sx={styles.fullname}>
            {employee.fullname}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const EmployeesDayCalendarColumnsHeader = memo(
  EmployeesDayCalendarColumnsHeaderComponent
);

const styles = {
  container: {
    display: "grid",
    gridTemplateRows: `100px`,
    backgroundColor: getCalendarTableBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderColor: "divider",
    position: "sticky",
    top: 0,
    zIndex: 10,
    overflowX: "hidden",
  },
  grid: {
    gridColumn: 1,
    gridRow: 1,
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderColor: "divider",
    position: "sticky",
    left: 0,
    zIndex: 8,
  },
  employee: {
    gridRow: 1,
    p: 1,
    textAlign: "center",
    backgroundColor: getCalendarTableBg,
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderColor: "divider",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.25,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  fullname: {
    color: "text.primary",
    fontWeight: 600,
    fontSize: "0.8125rem",
    maxWidth: "100%",
  },
};
