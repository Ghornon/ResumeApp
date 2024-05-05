import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const FullPageLayout = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minWidth: '100%',
                minHeight: '100vh',
                maxHeight: '100vh',
                overflowY: 'auto',
            }}>
            <Outlet />
        </Box>
    );
};

export default FullPageLayout;
