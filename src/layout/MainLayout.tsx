import { Outlet } from 'react-router-dom';

import { Box, Container, Toolbar } from '@mui/material';
import Header from './Header/Header';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', minWidth: '320px' }}>
            <Header />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, pb: '50px', pt: '10px' }}>
                <Toolbar />
                <Container sx={{ width: '100%', maxWidth: '1200px' }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
