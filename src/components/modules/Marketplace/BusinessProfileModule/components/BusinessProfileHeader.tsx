import { Box, Link, Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { SearchHeaderStateType } from "../../SearchModule/SearchHeader/search-header-types";
import SearchHeader from "../../SearchModule/SearchHeader/SearchHeader";
import AppLogo from "@/components/core/Logo/AppLogo";

const BusinessProfileHeader = () => {
	const theme = useTheme();
	const router = useRouter();
	const mainPagePadding = theme.spacing(2.5);

	const handleSearch = (state: SearchHeaderStateType) => {
		const params = new URLSearchParams();

		if (state.selectedBusinessDomainId != null) {
			params.set("businessDomain", String(state.selectedBusinessDomainId));
		}

		if (state.selectedServiceDomainId != null) {
			params.set("serviceDomain", String(state.selectedServiceDomainId));
		}

		if (state.selectedServiceId != null) {
			params.set("service", String(state.selectedServiceId));
		}

		router.push(`/search?${params.toString()}`, { scroll: false });
	};

	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			mt={1}
			mb={7.5}
			mx={7.5}
			sx={{ display: { xs: "none", lg: "flex" } }}
		>
			<Box
				component={Link}
				href="/"
				sx={{
					display: "block",
					cursor: "pointer",
					"&:hover .imageWrapper": { transform: "scale(1.05)" },
				}}
			>
				<AppLogo height={32} color={theme.palette.text.primary} />
			</Box>

			<SearchHeader
				areFiltersActive={false}
				mainPagePadding={mainPagePadding}
				headerState={{
					selectedBusinessDomainId: null,
					selectedServiceDomainId: null,
					selectedServiceId: null,
					startDate: null,
					startTime: null,
					endTime: null,
				}}
				displayFiltersSection={false}
				onSearch={handleSearch}
			/>

			<Box sx={{ visibility: "hidden" }}>
				<AppLogo height={32} color={theme.palette.text.primary} />
			</Box>
		</Stack>
	);
};

export default BusinessProfileHeader;
