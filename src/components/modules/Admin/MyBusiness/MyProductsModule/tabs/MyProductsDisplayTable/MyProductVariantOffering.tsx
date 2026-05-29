import { ProductOffering } from "@/ts/models/booking/product/Product";
import {
  Avatar,
  Box,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

type MyProductVariantOfferingProps = {
  offering: ProductOffering;
};

const MyProductVariantOffering = ({
  offering,
}: MyProductVariantOfferingProps) => {
  const { user, price, discount, price_with_discount } = offering;
  const { fullname, avatar, profession } = user;

  return (
    <TableRow sx={styles.tableRowBody}>
      <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
        <Stack flexDirection="row" alignItems="center" gap={1.5}>
          <Avatar src={avatar ?? ""} sx={{ width: 30, height: 30 }} />
          <Box sx={{ minWidth: 180 }}>
            <Typography variant="subtitle2" fontWeight="700">
              {fullname}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {profession}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell align="right" color="text.secondary">
        {price} lei
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: discount > 0 ? "error.main" : "text.secondary",
          fontWeight: discount > 0 ? 600 : 400,
        }}
      >
        {discount > 0 ? `-${discount}%` : "-"}
      </TableCell>
      <TableCell align="right" sx={{ fontWeight: 600 }}>
        {price_with_discount} lei
      </TableCell>
    </TableRow>
  );
};

export default MyProductVariantOffering;

const styles = {
  tableRowBody: {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": { bgcolor: "action.hover" },
  },
};
