import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';
import Header from './Header/Header';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />
            <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
