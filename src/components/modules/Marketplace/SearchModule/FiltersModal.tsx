import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import React from "react";

type FiltersModalProps = {
	open: boolean;
	onClose: () => void;
};

export default function FiltersModal({ open, onClose }: FiltersModalProps) {
	const actions: ActionButtonType[] = [
		{
			title: "Aplică",
			props: {
				onClick: () => {},
			},
		},
	];

	return (
		<Modal
			title="Filtre"
			open={open}
			handleClose={onClose}
			maxWidth="md"
			fullWidth
			actions={actions}
		>
			<Box sx={{ p: 2 }}>
				<Typography variant="h6" fontWeight={600}>
					Optiuni
				</Typography>

				<Button
					variant="outlined"
					color="secondary"
					size="large"
					sx={{ mt: 2.5 }}
					startIcon={<PercentIcon />}
				>
					Reducere
				</Button>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mt={5}
					mb={2.5}
				>
					<Typography variant="h6" fontWeight={600}>
						Pretul maxim
					</Typography>

					<Typography variant="h6" fontWeight={600}>
						1500 RON
					</Typography>
				</Stack>

				<Slider
					//size="small"
					defaultValue={70}
					aria-label="Small"
					valueLabelDisplay="auto"
					max={1500}
				/>

				<Typography variant="h6" fontWeight={600} mt={5}>
					Sorteaza dupa
				</Typography>
			</Box>
		</Modal>
	);
}
