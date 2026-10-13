import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BusinessClient } from "@/ts/models/booking/businessClient/BusinessClient";

type CreateOwnClientClientSectionProps = {
  selectedClient: BusinessClient | null;
  onOpenSelect: () => void;
};

const CreateOwnClientClientSection = ({
  selectedClient,
  onOpenSelect,
}: CreateOwnClientClientSectionProps) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        1. Client
      </Typography>

      <Button
        onClick={onOpenSelect}
        sx={styles.row}
        endIcon={<ChevronRightIcon color="action" />}
      >
        <PersonOutlineIcon sx={{ color: "text.secondary" }} />

        <Box sx={{ flex: 1, textAlign: "left" }}>
          {selectedClient ? (
            <>
              <Typography fontWeight={600} color="text.primary">
                {selectedClient.fullname}
              </Typography>
              {selectedClient.phone && (
                <Typography variant="body2" color="text.secondary">
                  {selectedClient.phone}
                </Typography>
              )}
            </>
          ) : (
            <Typography color="text.secondary">
              Selectează un client existent sau adaugă unul nou
            </Typography>
          )}
        </Box>
      </Button>
    </Stack>
  );
};

export default CreateOwnClientClientSection;

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    justifyContent: "flex-start",
    textAlign: "left",
    textTransform: "none",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 1.5,
    width: "100%",
  },
};
