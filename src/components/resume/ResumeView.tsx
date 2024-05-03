import { Box, Typography } from '@mui/material';

const ResumeView = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1 1 0',
                backgroundColor: 'rgb(101, 110, 131)',
                height: '100vh',
                overflow: 'visible',
                position: 'sticky',
                top: 0,
            }}>
            <Typography
                variant="h1"
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'whitesmoke',
                }}>
                ResumeView
            </Typography>
        </Box>
    );
};

export default ResumeView;
