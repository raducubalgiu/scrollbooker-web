import { useMutate } from "@/hooks/useHttp"
import { UnapprovedResponse } from "@/ts/models/Business/UnapprovedBusinessResponse"
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material"

type UnapprovedBusinessDetailsProps = { 
    unapproved: UnapprovedResponse,
    onRefetch: () => void
}
type BusinessDetailsInfoItemType = { title: string, text: string }

function BusinessDetailsInfoItem( { title, text }: BusinessDetailsInfoItemType) {
    return <Typography sx={{ py: 1 }}>{title}: <span style={{ fontWeight: 600 }}>{text}</span></Typography>
}

export function UnapprovedBusinessDetails( { unapproved, onRefetch }: UnapprovedBusinessDetailsProps) {
    const { id: userId, business } = unapproved

    const theme = useTheme()
    const mode = theme.palette.mode
    const paperBg = mode === 'light' ? theme.palette.background.default : theme.palette.background.paper

    const { isPending, mutate } = useMutate({
        key: 'approve-business',
        url: '/api/businesses/approve',
        options: {
            onSuccess() {
                onRefetch()
            },
        }
    })

    return (
        <Paper sx={{ p: 2.5, bgcolor: paperBg }}>
            <BusinessDetailsInfoItem title="Tip Business" text={business.business_type.name} />
            <BusinessDetailsInfoItem title="Angajati" text={business.has_employees ? 'DA' : 'NU'} />
            <BusinessDetailsInfoItem title="Adresa" text={business.location.address} />
            <Stack alignItems="flex-end">
                <Button 
                    loading={isPending}
                    disabled={isPending}
                    variant="contained" 
                    color="error" 
                    onClick={() => mutate({ userId })}
                >
                    Aprobă
                </Button>
            </Stack>
        </Paper>
    )
}