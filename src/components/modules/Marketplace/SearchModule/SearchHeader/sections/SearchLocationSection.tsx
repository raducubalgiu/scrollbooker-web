import {
	Box,
	Typography,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const SearchLocationSection = () => {
	return (
		<Box>
			<Typography variant="subtitle1" fontWeight={700} mb={0.5}>
				Unde?
			</Typography>

			<List>
				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<MyLocationIcon fontSize="medium" color="primary" />
					</ListItemIcon>
					<ListItemText
						primary="Locația curentă"
						slotProps={{ primary: { sx: { color: "primary.main" } } }}
					/>
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 1" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 2" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 3" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 4" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 5" />
				</ListItemButton>

				<ListItemButton sx={{ py: 2 }}>
					<ListItemIcon>
						<SearchIcon fontSize="medium" />
					</ListItemIcon>
					<ListItemText primary="Bucuresti - Sector 6" />
				</ListItemButton>
			</List>
		</Box>
	);
};

export default SearchLocationSection;
