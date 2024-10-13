import { Box, Typography, Button } from '@mui/material';
import banner from '../assets/images/banner.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <Box
            position="relative"
            width="100%"
            height="300px"
            maxHeight="300px"
            borderRadius="10px"
            overflow="hidden">
            <Box
                component="img"
                src={banner}
                alt="banner"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(30%)',
                    borderRadius: '10px',
                }}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center">
                <Typography variant="h5" color="white" mb={3}>
                    Free creator
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundImage: 'linear-gradient(to right, #4bd2d2, #3ca8a8)',
                        color: 'white',
                    }}>
                    <Link to="/resumes">Create resume</Link>
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
