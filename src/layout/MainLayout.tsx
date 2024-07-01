import { Outlet } from 'react-router-dom';

import { Box, Container, Toolbar } from '@mui/material';
import Header from './Header/Header';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 1, sm: 2 } }}>
                <Toolbar />
                <Container sx={{ width: '100%', maxWidth: '1200px' }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
