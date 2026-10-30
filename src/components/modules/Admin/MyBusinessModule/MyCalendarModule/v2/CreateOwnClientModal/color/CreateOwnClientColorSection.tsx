import React from "react";
import { Stack, Typography } from "@mui/material";
import CalendarColorPicker from "@/components/cutomized/CalendarColorPicker/CalendarColorPicker";
import { CalendarColorEnum } from "@/ts/enums/CalendarColorEnum";

type CreateOwnClientColorSectionProps = {
  step: number;
  value: CalendarColorEnum | null;
  onChange: (color: CalendarColorEnum | null) => void;
};

const CreateOwnClientColorSection = ({
  step,
  value,
  onChange,
}: CreateOwnClientColorSectionProps) => {
  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.25}>
        <Typography variant="subtitle1" fontWeight={700}>
          {step}. Culoare
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Opțional. Fără o alegere, programarea preia culoarea serviciului sau a angajatului.
        </Typography>
      </Stack>

      <CalendarColorPicker value={value} onChange={onChange} noneLabel="Implicit" />
    </Stack>
  );
};

export default CreateOwnClientColorSection;
