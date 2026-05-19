import { Box, Link, Stack, Typography, useTheme } from "@mui/material";
import SearchHeader from "../SearchModule/SearchHeader/SearchHeader";
import { SearchHeaderStateType } from "../SearchModule/SearchHeader/search-header-types";
import { useRouter } from "next/navigation";

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
    >
      <Box
        component={Link}
        href="/"
        sx={{
          textDecoration: "none",
          display: "block",
          color: "inherit",
          cursor: "pointer",
          "&:hover .imageWrapper": { transform: "scale(1.05)" },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={600}
          fontSize={32.5}
        >
          ScrollBooker
        </Typography>
      </Box>

      <SearchHeader
        businessDomains={[]}
        areFiltersActive={false}
        selectedServiceDomainName=""
        mainPagePadding={mainPagePadding}
        headerState={{
          selectedBusinessDomainId: null,
          selectedServiceDomainId: null,
          selectedServiceId: null,
        }}
        displayFiltersSection={false}
        onSearch={handleSearch}
      />

      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={700}
        fontSize={30}
        sx={{ color: "transparent" }}
      >
        ScrollBooker
      </Typography>
    </Stack>
  );
};

export default BusinessProfileHeader;
