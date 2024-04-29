import { CircularProgress, Grid } from '@mui/material';

export const Spinner = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" alignItems="center" minHeight={'100vh'}>
                    <CircularProgress />
                </Grid>
            </Grid>
        </Grid>
    );
};
