import {
  ProductUtils,
  ProductVariant,
} from "@/ts/models/booking/product/Product";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

type MyProductVariantsProps = {
  variants: ProductVariant[];
};

const MyProductVariants = ({ variants }: MyProductVariantsProps) => {
  return (
    <Box sx={styles.container}>
      {variants.map((v) => (
        <Accordion
          key={v.id}
          disableGutters
          elevation={0}
          sx={styles.accordion}
        >
          <AccordionSummary sx={styles.accordionSummary}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              {v.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • {ProductUtils.getDurationText(v.duration)}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={styles.accordionDetails}>
            <Typography variant="body2" sx={styles.employeeTitle}>
              Prețuri per angajat
            </Typography>

            <Box sx={styles.tableContainer}>
              <Table size="small">
                <TableHead sx={{ bgcolor: "neutral.50" }}>
                  <TableRow>
                    <TableCell sx={styles.headerCell}>Angajat</TableCell>
                    <TableCell align="right" sx={styles.headerCell}>
                      Preț
                    </TableCell>
                    <TableCell align="right" sx={styles.headerCell}>
                      Discount
                    </TableCell>
                    <TableCell align="right" sx={styles.headerCell}>
                      Preț final
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {v.offerings.map((of) => (
                    <TableRow key={of.user_id} sx={styles.tableRowBody}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 500 }}
                      >
                        {of.user_id}
                      </TableCell>
                      <TableCell align="right" color="text.secondary">
                        {of.price} lei
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color:
                            of.discount > 0 ? "error.main" : "text.secondary",
                          fontWeight: of.discount > 0 ? 600 : 400,
                        }}
                      >
                        {of.discount > 0 ? `-${of.discount}%` : "-"}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {of.price_with_discount} lei
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MyProductVariants;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },
  accordion: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "12px !important",
    overflow: "hidden",
    backgroundColor: "background.paper",
    "&:before": { display: "none" },
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
    },
  },
  accordionSummary: {
    backgroundColor: "background.paper",
    px: 2.5,
    py: 1,
    "& .MuiAccordionSummary-content": {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
  },
  accordionDetails: {
    px: 2.5,
    pb: 2.5,
    pt: 1,
    borderTop: "1px solid",
    borderColor: "divider",
    backgroundColor: "action.hover",
  },
  employeeTitle: {
    mb: 2,
    fontWeight: 700,
    color: "text.secondary",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tableContainer: {
    overflowX: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  headerCell: {
    fontWeight: 600,
    color: "text.secondary",
  },
  tableRowBody: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": { bgcolor: "action.hover" },
  },
};
