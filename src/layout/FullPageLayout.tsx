import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const FullPageLayout = () => {
    return (
        <Container sx={{position: 'relative', width: '100%', minWidth:'100%', minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto'}}>
            <Outlet />
        </Container>
    );
};

export default FullPageLayout;
