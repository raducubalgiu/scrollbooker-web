import { Box, IconButton, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React from 'react'

type SearchHeaderMobileProps = {
    onFilterClick: () => void;
    onOpenServicesSheet: () => void;
}

export default function SearchHeaderMobile({ onFilterClick, onOpenServicesSheet }: SearchHeaderMobileProps) {
  return (
    <Box sx={styles.container}>
        <Stack 
            flexDirection="row" 
            alignItems="center"
            justifyContent="space-between"
            sx={styles.headerContainer}
        >
            <Stack flexDirection="row" alignItems="center" gap={1}>
                <IconButton 
                    onClick={onOpenServicesSheet}
                    sx={{ p: 1 }}
                >
                    <SearchIcon />
                </IconButton>

                <Stack>
                    <Typography fontWeight={600} variant="body2">Toate Serviciile</Typography>
                    <Typography variant='caption' color="text.secondary">Tuns, Orice Ora</Typography>
                </Stack>
            </Stack>

            <IconButton 
                onClick={onFilterClick}
                sx={styles.filterButton}
            >
                <FilterAltOutlinedIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
        </Stack>
    </Box>
  )
}

const styles = {
    container: {
        position: "sticky", 
        top: 0, 
        zIndex: 1100, 
        py: 1.5,
        bgcolor: "background.default",
    },
    headerContainer: {
        display: { xs: "flex", md: "none" }, 
        p: 1, 
        borderRadius: 50, 
        border: 1, 
        borderColor: "rgba(0, 0, 0, 0.04)",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.06), 0px 1px 4px rgba(0, 0, 0, 0.04)",
    },
    filterButton: {
        border: 1,
        borderColor: 'divider',
        borderRadius: '50%',
        p: 1,
        mr: 0.5
    }
}


