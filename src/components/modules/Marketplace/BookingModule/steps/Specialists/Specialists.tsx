import {
  Box,
  Typography,
  SelectChangeEvent,
  alpha,
  useTheme,
} from "@mui/material";
import React, { memo } from "react";
import { SelectedBookingItem } from "../../BookingModule";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";
import SpecialistSelect from "./SpecialistSelect";
import SelectedItemsCheckSpecialist from "./SelectedItemsCheckSpecialist";

type SpecialistsProps = {
  selectedItems: SelectedBookingItem[];
  employees: BookingFlowUser[];
  selectedEmployeeId: number | null;
  onChangeSelectedEmployeeId: (event: SelectChangeEvent<number>) => void;
};

const Specialists = ({
  selectedItems,
  employees,
  selectedEmployeeId,
  onChangeSelectedEmployeeId,
}: SpecialistsProps) => {
  const theme = useTheme();

  const eligibleEmployees = React.useMemo(() => {
    if (!employees || employees.length === 0) return [];
    return employees.filter((emp) =>
      selectedItems.some((item) =>
        (item.offerings || []).some((o) => o.user?.id === emp.id)
      )
    );
  }, [employees, selectedItems]);

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3} mb={2}>
        Selectează specialistul
      </Typography>

      <SpecialistSelect
        eligibleEmployees={eligibleEmployees}
        selectedEmployeeId={selectedEmployeeId}
        onChangeSelectedEmployeeId={onChangeSelectedEmployeeId}
      />

      <Typography variant="h5" fontWeight={700} my={3}>
        Verificare servicii
      </Typography>

      {!selectedEmployeeId ? (
        <Box
          sx={{
            p: 6,
            borderRadius: 4,
            border: "2px dashed",
            borderColor: "divider",
            textAlign: "center",
            bgcolor: alpha(theme.palette.action.hover, 0.02),
          }}
        >
          <Typography color="text.secondary" fontWeight={500}>
            Selectează un specialist din lista de mai sus pentru a verifica
            disponibilitatea serviciilor.
          </Typography>
        </Box>
      ) : (
        selectedItems.map((item) => (
          <SelectedItemsCheckSpecialist
            key={item.productId}
            item={item}
            eligibleEmployees={eligibleEmployees}
            selectedEmployeeId={selectedEmployeeId}
          />
        ))
      )}
    </Box>
  );
};

export default memo(Specialists);
