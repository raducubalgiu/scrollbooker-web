import React from "react";
import Accordion from "../../core/Accordion/Accordion";
import Grid from "@mui/material/Grid2";
import Map from "@/components/core/Map/Map";
import {
  Divider,
  Stack,
  Switch,
  Tooltip,
  Typography,
  Alert,
} from "@mui/material";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import StarIcon from "@mui/icons-material/Star";

type MyBusinessDetailsProps = {
  description: string;
  address: string;
  coordinates: [number, number];
};

export default function MyBusinessDetails({
  description,
  address,
  coordinates,
}: MyBusinessDetailsProps) {
  return (
    <Accordion title="Detalii despre locatie" sx={{ pb: 2.5 }}>
      <Grid container spacing={3}>
        <Grid size={8}>
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {/* <AlertTitle>Necesita validare</AlertTitle> */}
            Necesită validare
          </Alert>
          <CustomStack justifyContent="flex-start">
            <Typography fontWeight={600} fontSize={20}>
              House of Barbers
            </Typography>
            <Typography color="textSecondary" ml={1}>
              @house_of_barbers
            </Typography>
            <CustomStack justifyContent="flex-start">
              <StarIcon color="primary" sx={{ ml: 1.5, mr: 0.5 }} />
              <Typography sx={{ fontWeight: "600" }}>5</Typography>
            </CustomStack>
          </CustomStack>
          <CustomStack justifyContent="flex-start" my={1}>
            <Typography fontSize={16} fontWeight={600} mr={1.5}>
              Descriere:
            </Typography>
            <Typography>{description}</Typography>
          </CustomStack>
          <CustomStack justifyContent="flex-start">
            <Typography fontSize={16} fontWeight={600} mr={1.5}>
              Adresa:
            </Typography>
            <Typography>{address}</Typography>
          </CustomStack>
          <CustomStack justifyContent="flex-start" mt={2.5}>
            <CustomStack sx={{ bgcolor: "#D32F2F", p: 0.5, borderRadius: 1 }}>
              <RocketLaunchOutlinedIcon fontSize="small" />
              <Tooltip
                title="Instant Booking - se referă la acele business-uri/angajați care iși gestionează propriul calendar. 
							Clienții pot rezerva serviciile acestora instant."
              >
                <Typography ml={1} fontWeight={600}>
                  Instant Booking
                </Typography>
              </Tooltip>
            </CustomStack>
            <Switch checked={false} disabled={true} />
          </CustomStack>
        </Grid>
        {/* <Grid size={4}>
					<Map coordinates={coordinates} />
				</Grid> */}
      </Grid>
      <Divider sx={{ mt: 5 }} />
      <CustomStack p={2.5} justifyContent="flex-start">
        <Stack alignItems="center">
          <CustomStack>
            <Typography fontSize={17}>Angajați</Typography>
            <Tooltip title="Angajatii sunt cei care ofera servicii in numele business-ului. Nu sunt inclusi aici managerii sau alte tipuri de angajati">
              <InfoOutlinedIcon sx={{ ml: 1 }} fontSize="small" />
            </Tooltip>
          </CustomStack>
          <Typography mt={1.5} fontWeight={600}>
            0
          </Typography>
        </Stack>
      </CustomStack>
    </Accordion>
  );
}
