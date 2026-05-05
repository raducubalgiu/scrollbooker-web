import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, MenuItem, Avatar, Box, Menu } from "@mui/material";
import React from "react";

type EmployeeButtonProps = {
  employees: BusinessEmployee[];
  employee: number | null;
  onSetEmployee: (s: number | null) => void;
};

const EmployeeButton: React.FC<EmployeeButtonProps> = ({
  employees,
  employee,
  onSetEmployee,
}) => {
  const [anchorEmployeeEl, setAnchorEmployeeEl] =
    React.useState<null | HTMLElement>(null);

  const handleEmployeeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEmployeeEl(event.currentTarget);
  };
  const handleEmployeeClose = () => setAnchorEmployeeEl(null);

  const isOpen = Boolean(anchorEmployeeEl);

  const selectedEmployee = employees.find((e) => e.id === employee) ?? null;

  return (
    <div>
      <Button
        id="employee-button"
        aria-controls={isOpen ? "employee-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        variant="outlined"
        size="large"
        color={employee ? "primary" : "secondary"}
        disableElevation
        onClick={handleEmployeeClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedEmployee ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={selectedEmployee.avatar ?? ""}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box component="span">{selectedEmployee.fullname}</Box>
          </Box>
        ) : (
          "Toti angajații"
        )}
      </Button>
      <Menu
        id="employee-menu"
        slotProps={{
          list: { "aria-labelledby": "employee-button" },
        }}
        anchorEl={anchorEmployeeEl}
        open={isOpen}
        onClose={handleEmployeeClose}
      >
        <MenuItem
          onClick={() => {
            onSetEmployee(null);
            handleEmployeeClose();
          }}
          selected={employee === null}
          disableRipple
        >
          Toti angajații
        </MenuItem>

        {employees.map((e) => (
          <MenuItem
            key={e.id}
            onClick={() => {
              onSetEmployee(e.id);
              handleEmployeeClose();
            }}
            selected={employee === e.id}
            disableRipple
          >
            <Avatar
              src={e.avatar ?? ""}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            {e.fullname}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EmployeeButton;
