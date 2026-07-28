import { Box, IconButton, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React from 'react'

type SearchHeaderMobileProps = {
    onFilterClick: () => void;
}

export default function SearchHeaderMobile({onFilterClick}: SearchHeaderMobileProps) {
  return (
    <Box bgcolor="background.default" sx={{ position: "sticky", top: 0, zIndex: 1100,py: 1.5 }}>
        <Stack 
            flexDirection="row" 
            alignItems="center"
            justifyContent="space-between"
            sx={{ 
                display: { xs: "flex", md: "none" }, 
                p: 1, 
                borderRadius: 50, 
                border: 1, 
                borderColor: "divider", 
                boxShadow: 1,
            }}
        >

        <Stack flexDirection="row" alignItems="center" gap={1}>
            <IconButton 
                onClick={() => {}}
                sx={{
                    p: 1
                }}
                >
                <SearchIcon />
            </IconButton>

            <Stack>
                <Typography fontWeight={600}>Toate Serviciile</Typography>
                <Typography variant='caption' color="text.secondary">Tuns, Orice Ora</Typography>
            </Stack>
        </Stack>

        <IconButton 
            onClick={onFilterClick}
            sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: '50%',
                p: 1
            }}
            >
            <FilterAltOutlinedIcon sx={{ color: 'text.secondary' }} />
        </IconButton>

        </Stack>
    </Box>
  )
}

