import { Box } from '@mui/material';
import FAQ from '../components/FAQ';
import Features from '../components/Features';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';

const Dashboard = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            minHeight="100vh"
            sx={{ pt: '20px' }}>
            <Hero />
            <Features />
            <Highlights />
            <FAQ />
        </Box>
    );
};

export default Dashboard;
