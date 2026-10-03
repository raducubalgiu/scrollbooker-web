import { ProductOffering } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type MyProductVariantOfferingProps = {
  offering: ProductOffering;
  isEditable: boolean;
};

const MyProductVariantOffering = ({
  offering,
  isEditable,
}: MyProductVariantOfferingProps) => {
  const [editMode, setEditMode] = useState(false);
  const { user, price, discount, price_with_discount } = offering;
  const { fullname, avatar, profession } = user;

  const inputStyle = {
    width: 150,
    minWidth: 150,
    "& .MuiInputBase-input": {
      textAlign: "right",
      p: "4px 8px",
    },
  };

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

      <TableCell align="right">
        {editMode ? (
          <TextField
            value={price}
            size="small"
            variant="outlined"
            sx={inputStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ m: 0 }}>
                    <Typography variant="caption" fontWeight={600}>
                      lei
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
        ) : (
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: "text.secondary" }}
          >
            {formatPrice(price)} lei
          </Typography>
        )}
      </TableCell>

      <TableCell align="right">
        {editMode ? (
          <TextField
            value={discount}
            size="small"
            variant="outlined"
            sx={inputStyle}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ m: 0 }}>
                    <Typography variant="caption" fontWeight={600}>
                      %
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: discount > 0 ? "error.main" : "text.secondary",
              fontWeight: discount > 0 ? 600 : 400,
            }}
          >
            {discount > 0 ? `-${discount}%` : "-"}
          </Typography>
        )}
      </TableCell>

      <TableCell align="right">
        {editMode ? (
          <TextField
            value={price_with_discount}
            size="small"
            variant="outlined"
            disabled
            sx={{
              ...inputStyle,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "action.hover",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ m: 0 }}>
                    <Typography variant="caption" fontWeight={600}>
                      lei
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {formatPrice(price_with_discount)} lei
          </Typography>
        )}
      </TableCell>

      <TableCell
        align="right"
        sx={{
          width: 120,
          minWidth: 120,
          whiteSpace: "nowrap",
        }}
      >
        {editMode ? (
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={0.25}
            sx={{
              width: "max-content",
              ml: "auto",
            }}
          >
            <Tooltip title="Renunță">
              <IconButton onClick={() => setEditMode(false)} color="error">
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Salvează">
              <IconButton onClick={() => setEditMode(false)} color="success">
                <CheckOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <IconButton disabled={!isEditable} onClick={() => setEditMode(true)}>
            <EditOutlinedIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default MyProductVariantOffering;

const styles = {
  tableRowBody: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
};
