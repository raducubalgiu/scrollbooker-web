import { useMediaQuery, useTheme } from "@mui/material";

export const useBreakpoints = () => {
	const theme = useTheme();
	const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
	const isTabletOrPhone = useMediaQuery(theme.breakpoints.down("md"));
	const isDesktopMediumOrDown = useMediaQuery(theme.breakpoints.down("lg"));

	return {
		isPhone,
		isTablet,
		isTabletOrPhone,
		isDesktopMediumOrDown,
	};
};
