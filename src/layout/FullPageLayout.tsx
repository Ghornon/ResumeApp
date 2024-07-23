import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const FullPageLayout = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    );
};

export default FullPageLayout;
