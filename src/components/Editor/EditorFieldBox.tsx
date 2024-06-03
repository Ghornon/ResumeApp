import { Box, Grid, Typography } from '@mui/material';

const EditorFieldBox = ({ title, children }: { title: string; children: React.ReactNode }) => {
    console.log('editor field box');
    return (
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
            <Typography variant="h4" component="h4">
                {title}
            </Typography>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </Box>
    );
};

export default EditorFieldBox;
