import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Grid spacing={2}>
            <Grid display="flex" justifyContent="center" alignItems="center" minHeight={'100vh'}>
                <Box
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Typography component="h1" variant="h1">
                        404
                    </Typography>
                    <Typography component="p">
                        The page you are looking for was not found.
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/')}
                        sx={{ mt: 3, mb: 2 }}>
                        Back to Home
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default NotFound;
