import { alpha, Box, Container, Tab, Tabs, Theme } from "@mui/material";
import React from "react";
import { BusinessProfileTabSection } from "../BusinessProfileModule";

type BusinessProfileTabsProps = {
	tabsContainerRef: React.RefObject<HTMLDivElement | null>;
	isTabsVisible: boolean;
	tabSections: BusinessProfileTabSection[];
	activeTab: string;
	onChangeTab: (_event: React.SyntheticEvent, value: string) => void;
};

const getBoxStyles = (isTabsVisible: boolean) => ({
	position: "fixed" as const,
	top: 0,
	left: 0,
	right: 0,
	zIndex: (theme: Theme) => theme.zIndex.appBar + 1000,
	bgcolor: "background.paper",
	borderBottom: "1px solid",
	borderColor: isTabsVisible ? "divider" : "transparent",
	transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s",
	transform: isTabsVisible ? "translateY(0)" : "translateY(-100%)",
	opacity: isTabsVisible ? 1 : 0,
	pointerEvents: isTabsVisible ? ("all" as const) : ("none" as const),
	boxShadow: isTabsVisible ? "0px 4px 20px rgba(0,0,0,0.05)" : "none",
	willChange: "transform, opacity",
});

const getTabsStyles = (isTabsVisible: boolean) => ({
	minHeight: { xs: 48, md: 72 },
	"& .MuiTabs-indicator": {
		height: { xs: 3, md: 4 },
		borderRadius: "4px",
		backgroundColor: "primary.main",
		transition: isTabsVisible
			? "all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
			: "none !important",
	},
	"& .MuiTabs-flexContainer": {
		gap: { xs: 1, md: 3 },
	},
	"&::-webkit-scrollbar": {
		display: "none",
	},
});

const tabStyles = {
	fontWeight: 600,
	textTransform: "none" as const,
	fontSize: { xs: 15, md: 18 },
	py: { xs: 1.5, md: 3 },
	px: { xs: 1.5, md: 2 },
	minWidth: "auto",
	minHeight: { xs: 48, md: 72 },
	color: "text.primary",
	"&.Mui-selected": { fontWeight: 700, boxShadow: "none" },
	"&:hover": { opacity: 0.92 },
	"&.Mui-focusVisible": {
		boxShadow: (theme: Theme) =>
			`0 0 0 4px ${alpha(theme.palette.primary.main, 0.12)}`,
	},
};

const BusinessProfileTabs = ({
	tabsContainerRef,
	isTabsVisible,
	tabSections,
	activeTab,
	onChangeTab,
}: BusinessProfileTabsProps) => {
	return (
		<Box ref={tabsContainerRef} sx={getBoxStyles(isTabsVisible)}>
			<Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 5 } }}>
				<Tabs
					value={activeTab}
					onChange={onChangeTab}
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
					sx={getTabsStyles(isTabsVisible)}
				>
					{tabSections.map(section => (
						<Tab
							key={section.id}
							value={section.id}
							label={section.label}
							sx={tabStyles}
						/>
					))}
				</Tabs>
			</Container>
		</Box>
	);
};

export default BusinessProfileTabs;
