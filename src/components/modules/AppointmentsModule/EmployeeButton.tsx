import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, MenuItem, Theme, Avatar, Box } from "@mui/material";
import React from "react";

const EMPLOYEES = [
  {
    id: 13,
    username: "raducu_balgiu",
    fullname: "Radu Ion",
    avatar: "https://avatars.githubusercontent.com/u/24688771?v=4",
  },
  {
    id: 14,
    username: "raducu_balgiu",
    fullname: "Cristi Dumitrache",
    avatar: "https://avatars.githubusercontent.com/u/24688771?v=4",
  },
];

type EmployeeButtonProps = {
  employee: number | null;
  onSetEmployee: (s: number | null) => void;
  theme: Theme;
};

const EmployeeButton: React.FC<EmployeeButtonProps> = ({
  employee,
  onSetEmployee,
  theme,
}) => {
  const [anchorEmployeeEl, setAnchorEmployeeEl] =
    React.useState<null | HTMLElement>(null);

  const handleEmployeeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEmployeeEl(event.currentTarget);
  };
  const handleEmployeeClose = () => setAnchorEmployeeEl(null);

  const isOpen = Boolean(anchorEmployeeEl);

  const selectedEmployee = EMPLOYEES.find((e) => e.id === employee) ?? null;

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
              src={selectedEmployee.avatar}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box component="span">{selectedEmployee.fullname}</Box>
          </Box>
        ) : (
          "Toti angajații"
        )}
      </Button>
      <DropdownMenu
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

        {EMPLOYEES.map((e) => (
          <MenuItem
            key={e.id}
            onClick={() => {
              onSetEmployee(e.id);
              handleEmployeeClose();
            }}
            selected={employee === e.id}
            disableRipple
          >
            <Avatar src={e.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
            {e.fullname}
          </MenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default EmployeeButton;
