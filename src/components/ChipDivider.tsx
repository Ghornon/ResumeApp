import { Box, Chip, Divider, Grid } from '@mui/material';

const ChipDivider = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <>
            <Divider sx={{ paddingY: 2 }}>
                <Chip
                    label={title}
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: 14, textTransform: 'uppercase' }}
                />
            </Divider>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                    paddingY: 2,
                }}>
                <Grid container spacing={2}>
                    {children}
                </Grid>
            </Box>
        </>
    );
};

export default ChipDivider;
