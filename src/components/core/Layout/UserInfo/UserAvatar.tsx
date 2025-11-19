import React from "react";
import { Badge, Avatar, useTheme, styled } from "@mui/material";

type UserAvatarProps = { 
	isBusinessOrEmployee: boolean | undefined, 
	url: string | undefined; 
	onOpenModal: () => void 
};

export default function UserAvatar({ isBusinessOrEmployee, url, onOpenModal }: UserAvatarProps) {
	const theme = useTheme()

	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
		backgroundColor: '#44b700',
		color: '#44b700',
		width: 17.5,
		height: 17.5,
		borderRadius: '50%',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: 17.5,
			height: 17.5,
			borderRadius: '50%',
			content: '""',
		},
		},
		'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
		},
	}));

	const avatar = <Avatar sx={{ width: 95, height: 95, border: `1px solid ${theme.palette.divider}` }} alt="Remy Sharp" src={url} />

	return (
		<>
			{!!isBusinessOrEmployee ? 
				<StyledBadge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					variant="dot"
					>
					{avatar}
				</StyledBadge> : avatar
			} 
		</>
	)
}
