import { CircularProgress, Grid } from '@mui/material';

export const Spinner = () => {
    return (
        <Grid spacing={2}>
            <Grid display="flex" justifyContent="center" alignItems="center" minHeight={'100vh'}>
                <CircularProgress />
            </Grid>
        </Grid>
    );
};
