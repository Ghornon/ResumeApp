import { CircularProgress, Grid } from '@mui/material';

export const Spinner = () => {
    return (
        <Grid container spacing={2} minHeight={'100vh'}>
            <Grid display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Grid>
        </Grid>
    );
};
