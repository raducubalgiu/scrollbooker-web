import React from "react";
import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function LayoutSearch() {
	const styles = {
		input: {
			"& .MuiOutlinedInput-root": {
				borderRadius: 3.5,
			},
		},
	};

	return (
		<Autocomplete
			freeSolo
			id="free-solo-2-demo"
			disableClearable
			options={[]}
			sx={{ minWidth: 150 }}
			size="small"
			renderInput={params => (
				<TextField
					{...params}
					sx={styles.input}
					placeholder="Cauta.."
					slotProps={{
						input: {
							...params.InputProps,
							type: "search",
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						},
					}}
				/>
			)}
		/>
	);
}
