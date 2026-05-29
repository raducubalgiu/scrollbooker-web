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
};

const MyProductVariants = ({ product }: MyProductVariantsProps) => {
  const { variants, has_different_prices, starting_offering } = product;
  const filtersText = ProductUtils.getFiltersSummary(product);
  const hasFilters = !!filtersText;

  //   if (variants.length === 1 && !has_different_prices) {
  //     const variant = variants[0];
  //     const hasDiscount = starting_offering.discount > 0;

  //     return (
  //       <Box
  //         sx={{
  //           border: "1px solid",
  //           borderColor: "divider",
  //           borderRadius: "12px",
  //           p: 2.5,
  //           backgroundColor: "background.paper",
  //         }}
  //       >
  //         <Box>
  //           <Typography variant="h5" fontWeight={600} color="text.primary">
  //             {variant?.name}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
  //             Durată: {ProductUtils.getDurationText(variant?.duration ?? 30)}
  //           </Typography>
  //           <Typography variant="body1" color="text.secondary">
  //             {filtersText}
  //           </Typography>
  //         </Box>

  //         <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
  //           <Typography fontSize={18} fontWeight={600}>
  //             {`${formatPrice(starting_offering.price_with_discount)} RON`}
  //           </Typography>
  //           {hasDiscount && (
  //             <>
  //               <Typography
  //                 variant="body1"
  //                 color="text.secondary"
  //                 sx={{ textDecoration: "line-through" }}
  //               >
  //                 {formatPrice(starting_offering.price)}
  //               </Typography>
  //               <Typography fontWeight={600} color="error.main">
  //                 (-{starting_offering.discount}%)
  //               </Typography>
  //             </>
  //           )}
  //         </Stack>
  //       </Box>
  //     );
  //   }

  // 2. Fallback pe varianta ta cu liste de Acordeoane dacă sunt mai mulți angajați sau variante
  return (
    <Box sx={styles.container}>
      {variants.map((v) => {
        // if (v.offerings.length === 1) {
        //   const offering = v.offerings[0];

        //   return (
        //     <Box
        //       key={v.id}
        //       sx={{
        //         border: "1px solid",
        //         borderColor: "divider",
        //         borderRadius: "12px",
        //         p: 2.5,
        //         backgroundColor: "background.paper",
        //       }}
        //     >
        //       <Box>
        //         <Typography variant="h5" fontWeight={600} color="text.primary">
        //           {v?.name}
        //         </Typography>
        //         <Typography
        //           variant="body2"
        //           color="text.secondary"
        //           sx={{ mt: 0.5 }}
        //         >
        //           Durată: {ProductUtils.getDurationText(v?.duration)}
        //         </Typography>
        //         <Typography variant="body1" color="text.secondary">
        //           {filtersText}
        //         </Typography>
        //       </Box>

        //       <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
        //         <Typography fontSize={18} fontWeight={600}>
        //           {`${formatPrice(offering.price_with_discount)} RON`}
        //         </Typography>
        //         {offering?.discount > 0 && (
        //           <>
        //             <Typography
        //               variant="body1"
        //               color="text.secondary"
        //               sx={{ textDecoration: "line-through" }}
        //             >
        //               {formatPrice(offering.price)}
        //             </Typography>
        //             <Typography fontWeight={600} color="error.main">
        //               (-{offering.discount}%)
        //             </Typography>
        //           </>
        //         )}
        //       </Stack>
        //     </Box>
        //   );
        // }

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
                      <MyProductVariantOffering
                        key={of.user.id}
                        offering={of}
                      />
                    ))}
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
};
