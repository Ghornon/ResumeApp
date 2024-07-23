import { Box, Chip, Divider, Grid } from '@mui/material';

const EditorFieldBox = ({ title, children }: { title: string; children: React.ReactNode }) => {
    console.log('editor field box');
    return (
        <>
            <Divider sx={{ paddingX: 10, paddingY: 2 }}>
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
                    paddingX: 10,
                    paddingY: 2,
                }}>
                <Grid container spacing={2}>
                    {children}
                </Grid>
            </Box>
        </>
    );
};

export default EditorFieldBox;
