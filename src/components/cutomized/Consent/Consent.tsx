import React from "react";
import {
	Paper,
	Typography,
	ListItem,
	ListItemText,
	CircularProgress,
	Box,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

type ConsentProps = {
	acknowledged: boolean;
	setAcknowledged: (e: boolean) => void;
	mainTitle: string;
	isLoading: boolean;
	sections: string[];
};

export default function Consent({
	isLoading,
	mainTitle,
	acknowledged,
	setAcknowledged,
	sections,
}: ConsentProps) {
	return (
		<>
			<Paper sx={{ p: 2, maxHeight: 300, overflow: "auto", my: 2.5 }}>
				<Typography variant="h6" gutterBottom>
					{mainTitle}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Te rugăm să citești cu atenție informațiile de mai jos:
				</Typography>
				{!isLoading &&
					sections?.map((section, index) => {
						const [titleLine, ...descLines] = section.split("\n- ");
						const title = titleLine.trim();
						const description = descLines.join("\n- ").trim();

						return (
							<ListItem key={index} alignItems="flex-start">
								<ListItemText
									primary={
										<Typography variant="subtitle1" fontWeight={600}>
											{title}
										</Typography>
									}
									secondary={
										<Typography variant="body2">{description}</Typography>
									}
								/>
							</ListItem>
						);
					})}
				{isLoading && <CircularProgress />}
			</Paper>

			<Box>
				<FormControlLabel
					label="Am citit și sunt de acord cu condițiile de mai sus."
					control={
						<Checkbox
							checked={acknowledged}
							onChange={e => setAcknowledged(e.target.checked)}
						/>
					}
				/>
			</Box>
		</>
	);
}
