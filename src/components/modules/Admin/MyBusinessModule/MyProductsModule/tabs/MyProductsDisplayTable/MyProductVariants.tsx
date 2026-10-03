import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
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
import MyProductVariantOffering from "./MyProductVariantOffering";

type MyProductVariantsProps = {
  product: Product;
  authUserId: number | null;
};

const MyProductVariants = ({ product, authUserId }: MyProductVariantsProps) => {
  const { variants } = product;
  const filtersText = ProductUtils.getFiltersSummary(product);
  const hasFilters = !!filtersText;

  return (
    <Box sx={styles.container}>
      {variants.map((v) => {
        return (
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
                • {ProductUtils.getDurationText(v.duration)} {hasFilters && "•"}{" "}
                {filtersText}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={styles.accordionDetails}>
              <Typography variant="body2" sx={styles.employeeTitle}>
                Prețuri
              </Typography>

              <Box sx={styles.tableContainer}>
                <Table size="small">
                  <TableHead sx={{ bgcolor: "neutral.50" }}>
                    <TableRow>
                      <TableCell sx={styles.headerCell}>Angajat</TableCell>
                      <TableCell
                        align="right"
                        sx={{ ...styles.headerCell, width: 300, minWidth: 300 }}
                      >
                        Preț standard
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ ...styles.headerCell, width: 300, minWidth: 300 }}
                      >
                        Discount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ ...styles.headerCell, width: 300, minWidth: 300 }}
                      >
                        Preț final
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          ...styles.headerCell,
                          width: 150,
                          minWidth: 150,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Editează
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {v.offerings.map((of) => {
                      return (
                        <MyProductVariantOffering
                          key={of.user.id}
                          offering={of}
                          isEditable={authUserId === of.user.id}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
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
};
