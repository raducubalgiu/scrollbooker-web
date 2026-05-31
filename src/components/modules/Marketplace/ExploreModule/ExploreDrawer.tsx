import {
  Box,
  Button,
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ExploreDrawerProps = {
  defaultBusinessTypes: Set<number>;
  onCloseDrawer: () => void;
  onFilter: (selectedIds: Set<number>) => void;
};

const ExploreDrawer = ({
  defaultBusinessTypes,
  onCloseDrawer,
  onFilter,
}: ExploreDrawerProps) => {
  const [selectedBusinessTypes, setSelectedBusinessTypes] =
    useState<Set<number>>(defaultBusinessTypes);

  useEffect(() => {
    setSelectedBusinessTypes(defaultBusinessTypes);
  }, [defaultBusinessTypes]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // const handleToggle = (id: number) => {
  //   setSelectedBusinessTypes((prev) => {
  //     const next = new Set(prev);
  //     next.has(id) ? next.delete(id) : next.add(id);
  //     return next;
  //   });
  // };

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexShrink: 0 }}
      >
        <Typography
          fontWeight={700}
          sx={{ color: "text.primary", fontSize: 30 }}
        >
          ScrollBooker
        </Typography>

        <IconButton
          onClick={onCloseDrawer}
          sx={{
            bgcolor: "background.paper",
            p: { xs: 1.5, sm: 1.5 },
          }}
        >
          <CloseIcon
            sx={{
              fontSize: { xs: "1.5rem", sm: "2.1875rem" },
              color: "text.primary",
            }}
          />
        </IconButton>
      </Stack>

      <Typography color="text.secondary" fontSize={18}>
        Alege ce vrei sa vezi in feed-ul tau
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          my: 5,
          pr: 1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* {MVP_BUSINESS_DOMAINS.map((bDomain) => (
          <Accordion
            key={bDomain.id}
            sx={{
              bgcolor: "background.paper",
              "&:before": { display: "none" },
              mb: 2,
              borderRadius: "12px !important",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              p: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "common.white" }} />}
            >
              <Typography sx={{ color: "common.white", fontWeight: 600 }}>
                {bDomain.short_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "grey.500" }}>
              {bDomain.business_types.map((bType) => (
                <Stack
                  key={bType.id}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => handleToggle(bType.id)}
                  sx={{
                    cursor: "pointer",
                    py: 0.5,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Typography>{bType.name}</Typography>
                  <Checkbox
                    checked={selectedBusinessTypes.has(bType.id)}
                    readOnly
                  />
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
        ))} */}
      </Box>

      <Box sx={{ flexShrink: 0, pt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => onFilter(selectedBusinessTypes)}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 50,
            bgcolor: "#FF6F00",
            color: "text.primary",
          }}
        >
          Filtreaza
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ExploreDrawer;
