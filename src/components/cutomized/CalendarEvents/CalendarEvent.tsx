import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Box,
	Avatar,
	Typography,
	Stack,
	Checkbox,
	IconButton,
	Tooltip,
} from "@mui/material";
import { Theme } from "@mui/system";
import { SlotType } from "./calendar-types";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { find } from "lodash";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { BlockedSlotActionEnum } from "./useCalendarEvents";

type CalendarEventProps = {
	slot: SlotType;
	eventHeight: number;
	topOffset: number;
	blockedSlots: SlotType[];
	onHandleBlockSlots: (
		slots: SlotType[],
		action: BlockedSlotActionEnum
	) => void;
};

export default function CalendarEvent({
	slot,
	eventHeight,
	topOffset,
	blockedSlots,
	onHandleBlockSlots,
}: CalendarEventProps) {
	const [checked, setChecked] = useState(false);
	const { is_booked } = slot || {};

	useEffect(() => {
		setChecked(
			!!find(blockedSlots, ["start_date_locale", slot.start_date_locale])
		);
	}, [blockedSlots, slot.start_date_locale]);

	const styles = {
		constainer: {
			left: 0,
			right: 0,
			position: "absolute",
			overflow: "hidden",
			borderRadius: 0.5,
			p: 1.5,
		},
		avatar: {
			width: 30,
			height: 30,
			border: "2px solid #fff",
		},
	};

	const getBgColor = (theme: Theme) => {
		switch (true) {
			case slot.channel === "closer_app":
				return theme.palette.primary[100];
			case slot.channel === "own_client":
				return theme.palette.success.main;
			case checked:
				return "#1A1A1A";
			default:
				return "";
		}
	};

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		const action = e.target.checked
			? BlockedSlotActionEnum.CREATE
			: BlockedSlotActionEnum.DELETE;
		onHandleBlockSlots([slot], action);
	};

	return (
		<Box
			sx={(theme: Theme) => ({
				height: checked ? eventHeight : eventHeight - 15,
				top: topOffset,
				bgcolor: getBgColor(theme),
				borderBottom: checked ? "1px solid rgba(81, 81, 81, 1)" : "",
				m: checked ? 0 : 1,
				...styles.constainer,
			})}
		>
			{is_booked && (
				<Box>
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="flex-start"
						sx={{ mb: 1.5 }}
					>
						<Avatar sx={styles.avatar} alt="Remy Sharp" />
						<Typography fontSize={15} sx={{ ml: 1.5, fontWeight: "600" }}>
							@{slot.customer?.username}
						</Typography>
					</Stack>
					<Typography fontSize={15} color="#fff">
						Durată: 09:00 - 10:00
					</Typography>
					<Typography fontSize={15} color="#fff">
						Serviciu: Tuns
					</Typography>
					<Typography fontSize={15} color="#fff">
						Preț: 100 lei
					</Typography>
				</Box>
			)}
			{!is_booked && (
				<Box sx={{ height: eventHeight - 25 }}>
					<Stack justifyContent="flex-end" flexDirection="row">
						<Tooltip title="Blochează acest slot">
							<Checkbox
								checked={checked}
								color="default"
								disabled={checked}
								onChange={e => handleCheckbox(e)}
							/>
						</Tooltip>
					</Stack>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mt: 1.5,
							opacity: checked ? 0.4 : 1,
						}}
					>
						{!checked && (
							<Tooltip title="Adaugă o programare">
								<IconButton>
									<AddCircleOutlinedIcon fontSize="large" color="primary" />
								</IconButton>
							</Tooltip>
						)}
						{checked && (
							<Stack alignItems="center">
								<LockOutlinedIcon />
								<Typography sx={{ mt: 0.5 }}>Slot Blocat</Typography>
							</Stack>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
}
