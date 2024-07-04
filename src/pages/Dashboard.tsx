import { Box, Button, Typography } from '@mui/material';
import bunner from '../assets/images/bunner.jpg';

const Dashboard = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            minHeight="100vh"
            sx={{ pt: '20px' }}>
            <Box
                position="relative"
                width="100%"
                height="300px"
                maxHeight="300px"
                borderRadius="10px"
                overflow="hidden">
                <Box
                    component="img"
                    src={bunner}
                    alt="bunner"
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
                        Create resume
                    </Button>
                </Box>
            </Box>
            <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyItems="flex-start"
                alignItems="flex-start"
                sx={{ pt: '20px' }}>
                <Typography variant="body1" color="black" mb={2}>
                    With the resume creator on the resucraft platform, you can easily prepare the
                    documents needed to apply for your dream job. Choose from hundreds of free,
                    professionally designed templates that you can customize to your needs with just
                    a few clicks.
                </Typography>
                <Typography variant="body1" color="black" mb={2}>
                    Formatting your resume and choosing fonts for your cover letter will never take
                    you hours again. With the free online resume creator on the resucraft platform,
                    you can easily create a simple yet attractive curriculum vitae.
                </Typography>
                <Typography variant="body1" color="black" mb={2}>
                    Choose from hundreds of free, professionally designed templates that you can
                    customize in minutes to suit your needs. Just a few clicks to change colors,
                    fonts, or layout, add graphic elements, and tailor your resume to the job
                    posting you're applying for.
                </Typography>
                <Typography variant="body1" color="black" mb={3}>
                    With our creator, the graphic design is taken care of. All you have to do is
                    describe your skills in a way that leaves no doubt that no one is better suited
                    for the job than you.
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
